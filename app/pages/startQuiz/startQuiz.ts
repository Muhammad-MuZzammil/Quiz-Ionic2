
import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {QuizService} from "./quizService";
@Component({
    templateUrl: 'build/pages/startQuiz/startQuiz.html'

})
export class startQuiz implements OnInit {

    questionArr: any[] = [];
    CheckboxOptionArray: any[] = [];
    questionKeyArray: any[] = [];
    index: number = 0;
    question: any;
    lastQuestion: boolean = false;
    correct: boolean;
    answer: boolean;
    Quiz: any[] = [];
    QuizQuestionSet: any[] = [];
    QuizParams: string;
    QuizUniqueId: string;
    GroupId: string;
    subgroupId: string;
    showNext: boolean = false;
    showSave: boolean = false;
    userAnswer: any;
    optionRadioButton;
    QuestionSetOptionRadioButton;
    duration
    remainingTime
    questioStartedIndex : number
    constructor(public _navController: NavController, public params: NavParams, private QuizSchedule: GetGroupQuizSchedule, private _QuizService: QuizService) { }

    ngOnInit() {
        this.QuizParams = this.params.get('quizshow');
        this.GroupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.QuizUniqueId = this.QuizSchedule.getQuizId(this.QuizParams);
        this.duration = this.QuizSchedule.groupQuiz[this.QuizParams].duration;

        firebase.database().ref('quiz-in-progress').child(this.QuizUniqueId).on("value", (quizData) => {
            for (var book in quizData.val()["questionbanks"]) {
                for (var chapter in quizData.val()["questionbanks"][book].chapters) {
                    for (var topic in quizData.val()["questionbanks"][book].chapters[chapter].topics) {
                        for (var question in quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions) {
                            this.questionKeyArray.push(question);
                            this.questionArr.push(quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions[question]);
                        } // for in loop questions end
                    } // for in loop Topics end
                } // for in loop chapters end
            } // for in loop on Book end
            var UserQuizObject = {
                userId: this.QuizSchedule.getCurrentUser(),
                groupId: this.GroupId,
                subgroupId: this.subgroupId,
                quizId: this.QuizUniqueId
            }
            this._QuizService.userQuiz(this.questionArr,UserQuizObject,this.questionKeyArray).then((res)=> {
                if(res) {
                    this.question = this.questionArr[res["question-started-index"]];
                    this.userAnswer =  res.questions[res["question-started-index"]];
                    this.questioStartedIndex = res["question-started-index"];
                    for(var questionOriginalKey in this.userAnswer){
                        this.remainingTime = this.userAnswer[questionOriginalKey]["timer"]
                    }
                    // this.duration = this.remainingTime ? this.remainingTime : this.duration;
                    this.countdown("duration", this.duration, 0, this.remainingTime);
                }
                // this._QuizService.userQuiz()
            })

        })
    }// ngOnInit function end
    // show Timer
    countdown(element, minutes, seconds,remainingTime) {
            var time = remainingTime ? remainingTime : minutes * 60 + seconds;

        var interval = setInterval(()=> {
            var el = document.getElementById(element);
            if (time == 0) {
                el.innerHTML = "countdown's over!";
                clearInterval(interval);
                this.saveQuizToFirebase(this.Quiz)
                return;
            }
            var minutes = Math.floor(time / 60);
            if (minutes < 10) minutes = <any>"0" + minutes;
            var seconds = time % 60;
            if (seconds < 10) seconds = <any>"0" + seconds;
            var text = minutes + ':' + seconds;
            el.innerHTML = text;
            time--;
            this.remainingTime = time

        }, 1000);
    }
    active(rad1) {}
    // save checkbox question option in local array;
    savequestion(option, checked, type,index) {
        if (checked) {
            type ? this.QuestionSetOptionRadioButton = true : this.optionRadioButton = true;
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: index
            });

        } else {
            this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
                html: index
            }), 1);
            if (type) {
                this.CheckboxOptionArray.length == 0 ? this.QuestionSetOptionRadioButton = false : "";
            } else {
                this.CheckboxOptionArray.length == 0 ? this.optionRadioButton = false : "";
            }

        }
    }    // save checkbox question option in local array;
    //nextQuestion show next question after liking on next button
    nextQuestion(optionRadioButton, question, QuestionSetOptionRadioButton) {
        var questionIndex = this.questionArr.indexOf(question); // find index of question index
        var questionKey = this.questionKeyArray[questionIndex] // get data of question by giving index
        // push data in Quiz Array if question type is == 1
        if (question.type === 1) {
            var radioButtonOptionIndex = parseInt(optionRadioButton)
            console.log(radioButtonOptionIndex);
            var radioButtonOptionRandomIndex = question.options.length - (radioButtonOptionIndex + 1);
            this.Quiz.push({
                timer: this.remainingTime,
                type: question.type,
                optionOriginalIndex: radioButtonOptionIndex,
                optionRandomIndex: radioButtonOptionRandomIndex,
                questionKey: questionKey
            })
        }// if statement end
        // push data in Quiz Array else if question type is == 2

        else if (question.type === 2) {
            var checkboxOptionIndex = [];
             this.CheckboxOptionArray.forEach((checkboxIndex) => {
                var CheckboxOptionRandomIndex = question.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                checkboxOptionIndex.push({CheckboxOptionRandomIndex: CheckboxOptionRandomIndex})
             })
            this.Quiz.push({
                timer: this.remainingTime,
                type: question.type,
                optionOriginalIndex: this.CheckboxOptionArray,
                optionRandomIndex: checkboxOptionIndex,
                questionKey: questionKey
            })
        }//else if statement end

        else {
            // push data in Quiz Array else question type is == 3
            this.QuizQuestionSet = [];
            question.questiones.forEach((questionSet, i) => {
                // if question set question type == 1
                if (questionSet.type === 1) {
                    // var questionSetRadioButtonOption = {
                    //     html: QuestionSetOptionRadioButton
                    // }
                    var questionSetRadioButtonOptionIndex = parseInt(QuestionSetOptionRadioButton);
                    var questionSetRadioButtonOptionRandomIndex = questionSet.options.length - (questionSetRadioButtonOptionIndex + 1);
                    //make question Radio Button Object
                    var questionRadioButton = {
                        timer: this.remainingTime,
                        type: question.type,
                        optionOriginalIndex: questionSetRadioButtonOptionIndex,
                        optionRandomIndex: questionSetRadioButtonOptionRandomIndex,
                        questionKey: questionKey
                    }
                    // push question Radio Button Object
                    this.QuizQuestionSet.push(questionRadioButton);
                }
                //make question checkbox Object

                else if (questionSet.type === 2) {
                    var questionCheckbox = {
                        html: questionSet.html,
                        type: questionSet.type,
                        option: this.CheckboxOptionArray,
                    }
                    //push question checkbox Object

                    this.QuizQuestionSet.push(questionCheckbox);

                }
            })
            // push data in Quiz Array else question type is == 3

            this.Quiz.push({
                html: question.html,
                type: question.type,
                questiones: this.QuizQuestionSet,
                questionKey: questionKey
            })
        } // else question type is == 3 end
        // empty CheckboxOptionArray after push data in quiz
        this.CheckboxOptionArray = [];
        this.index++;
        this.optionRadioButton = null;
        this.QuestionSetOptionRadioButton = null;
        this.saveQuizToFirebase(this.Quiz)
        // check if this.questionArr.length is greater than index if greater than assign next question in this.question Object
        if (this.questionArr.length > this.index) {
            this.question = this.questionArr[this.index];

        }
        // check if this.questionArr.length is  equal to index if equal to then show save button
        if ((this.questionArr.length - 1) == this.index) {
            this.lastQuestion = true;
        }
        if (this.questionArr.length - 1 < this.index) {

        }

    }//nextQuestion show next question after liking on next button
    // save Quiz To firebase funtion start
    saveQuizToFirebase(quiz) {
        //  var ref = new Firebase("https://luminous-torch-4640.firebaseio.com/");

        var UserQuizObject = {
            userId: this.QuizSchedule.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        this._QuizService.saveQuizToFirebase(UserQuizObject, quiz, this.questioStartedIndex).then(() => {
            alert("Quiz Submit");
            this.questioStartedIndex += 1;
        })
    }// save Quiz To firebase funtion end

}//startQuiz class end
