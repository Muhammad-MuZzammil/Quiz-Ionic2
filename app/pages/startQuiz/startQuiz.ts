
import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {QuizService} from "./quizService";
import {quizResultComponent} from "../quizResult/quizResult";
import {QuestionRadioTypeComponent} from "./questionRadioType";
import {QuestionCheckboxTypeComponent} from "./questionCheckboxType";
import {QuestionSetSelectedOption} from "./questionSetType";
@Component({
    templateUrl: 'build/pages/startQuiz/startQuiz.html',
    directives: [QuestionRadioTypeComponent, QuestionCheckboxTypeComponent, QuestionSetSelectedOption]

})
export class startQuiz implements OnInit {

    questionArr: any[] = [];
    CheckboxOptionArray: any[] = [];
    QuizQuestionSet: any[] = [];
    Quiz: any[] = [];
    question: any;
    questionKeyArray: any[] = [];
    QuizParams: string;
    QuizUniqueId: string;
    subgroupId: string;
    GroupId: string;
    index: number = 0;
    lastQuestion: boolean = false;
    showTime: boolean = false;
    QuestionSetOption: boolean = false;
    userAnswer: any;
    optionRadioButton: boolean;
    checkboxOption: boolean;
    QuestionSetOptionRadioButton: boolean;
    duration: number;
    remainingTime: number;

    constructor(public _navController: NavController, public params: NavParams, private QuizSchedule: GetGroupQuizSchedule, private _QuizService: QuizService) { }

    ngOnInit() {
        this.QuizParams = this.params.get('quizshow');
        this.GroupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.QuizUniqueId = this.QuizSchedule.getQuizId(this.QuizParams);
        this.duration = this.QuizSchedule.groupQuiz[this.QuizParams].duration;

        this._QuizService.getQuizInProgess(this.QuizUniqueId).then((res: any) => {
            this.questionArr = res.quizQuestionArr;
            this.questionKeyArray = res.quizQuestionKeyArray;
            var UserQuizObject = {
                userId: this.QuizSchedule.getCurrentUser(),
                groupId: this.GroupId,
                subgroupId: this.subgroupId,
                quizId: this.QuizUniqueId
            }
            this._QuizService.userQuiz(this.questionArr, UserQuizObject, this.questionKeyArray).then((response: any) => {
                if (response) {
                    this.question = this.questionArr[response["question-started-index"]];
                    console.log(this.question)
                    this.index = response["question-started-index"];
                    if (this.index === this.questionArr.length - 1) {
                        this.lastQuestion = true;
                    }
                    var questionStartedIndex = this.index ? this.questionArr.length - this.index : this.index;
                    this.userAnswer = response.questions[questionStartedIndex];
                    for (var questionOriginalKey in this.userAnswer) {
                        this.remainingTime = this.userAnswer[questionOriginalKey]["timer"]
                    }
                    this.countdown("duration", this.duration, 0, this.remainingTime);
                }
            })
        })
    }// ngOnInit function end

    // show Timer
    countdown(element, minutes, seconds, remainingTime) {
        var time = remainingTime ? remainingTime : minutes * 60 + seconds;
        console.log(element, minutes, seconds, remainingTime)
        var interval = setInterval(() => {
            var el = document.getElementById("duration");
            console.log(el)
            if (time == 0) {
                el.innerHTML = "Time's over!";
                clearInterval(interval);
                this.saveQuizToFirebase(this.Quiz, true)
                return;
            }
            var minutes = Math.floor(time / 60);
            if (minutes < 10) minutes = <any>"0" + minutes;
            var seconds = time % 60;
            if (seconds < 10) seconds = <any>"0" + seconds;
            var text = minutes + ':' + seconds;
            this.showTime = true;
            console.log(el, "element")
            el.innerHTML = text;
            time--;
            this.remainingTime = time

        }, 1000);// setInterval end
    }// show Timer end

    saveRadioButtonOption(radioOption, question) {
        this.optionRadioButton = true;
        var questionIndex = this.questionArr.indexOf(question); // find index of question index

        var questionKey = this.questionKeyArray[questionIndex] // get data of question by giving index

        this.Quiz.push({
            timer: this.remainingTime,
            type: radioOption.type,
            optionOriginalIndex: radioOption.optionOriginalIndex,
            optionRandomIndex: radioOption.optionRandomIndex,
            questionKey: questionKey
        })

    }
    saveCheckboxOption(checkboxOption, question) {
        var questionIndex = this.questionArr.indexOf(question); // find index of question index

        var questionKey = this.questionKeyArray[questionIndex]
        if (checkboxOption) {
            console.log(checkboxOption, "checkboxOption")
            this.checkboxOption = true;
            this.Quiz.push({
                timer: this.remainingTime,
                type: checkboxOption.type,
                optionOriginalIndex: checkboxOption.optionOriginalIndex,
                optionRandomIndex: checkboxOption.optionRandomIndex,
                questionKey: questionKey
            })
        }
        else {
            this.optionRadioButton = false;
        }
    }
    // // save checkbox question option in local array;
    // savequestion(option, checked, type,index) {
    //     if (checked) {
    //         type ? this.QuestionSetOption = true : this.optionRadioButton = true;
    //         this.CheckboxOptionArray.push({
    //             checkboxOriginalIndex: index
    //         });
    //     } else {
    //         this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
    //             checkboxOriginalIndex: index
    //         }), 1);
    //         if (type) {
    //             this.CheckboxOptionArray.length == 0 ? this.QuestionSetOption = false : "";
    //         } else {
    //             this.CheckboxOptionArray.length == 0 ? this.optionRadioButton = false : "";
    //         }
    //     }
    // }    // save checkbox question option in local array;

    //nextQuestion show next question after liking on next button
    nextQuestion(optionRadioButton, question, QuestionSetOptionRadioButton) {
        var questionIndex = this.questionArr.indexOf(question); // find index of question index

        var questionKey = this.questionKeyArray[questionIndex] // get data of question by giving index
        // push data in Quiz Array if question type is == 1
        if (question.type === 1) {
            console.log(this.Quiz, "this.Quiz")
        }// if statement end

        // push data in Quiz Array else if question type is == 2
        else if (question.type === 2) {
            console.log(this.Quiz, "this.Quiz")
        }
        // else if (question.type === 2) {
        //     var checkboxOptionIndex = [];
        //      this.CheckboxOptionArray.forEach((checkboxIndex) => {
        //         var CheckboxOptionRandomIndex = question.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
        //         checkboxOptionIndex.push({CheckboxOptionRandomIndex: CheckboxOptionRandomIndex})
        //      })
        //     this.Quiz.push({
        //         timer: this.remainingTime,
        //         type: question.type,
        //         optionOriginalIndex: this.CheckboxOptionArray,
        //         optionRandomIndex: checkboxOptionIndex,
        //         questionKey: questionKey
        //     })
        // }//else if statement end

        else {
            // push data in Quiz Array else question type is == 3
            this.QuizQuestionSet = [];
            question.questiones.forEach((questionSet, i) => {
                // if question set question type == 1
                if (questionSet.type === 1) {
                    var questionSetRadioButtonOptionIndex = parseInt(QuestionSetOptionRadioButton);
                    var questionSetRadioButtonOptionRandomIndex = questionSet.options.length - (questionSetRadioButtonOptionIndex + 1);
                    //make question Radio Button Object
                    var questionRadioButton = {
                        timer: this.remainingTime,
                        type: questionSet.type,
                        optionOriginalIndex: questionSetRadioButtonOptionIndex,
                        optionRandomIndex: questionSetRadioButtonOptionRandomIndex,
                        questionKey: questionKey
                    }
                    // push question Radio Button Object
                    this.QuizQuestionSet.push(questionRadioButton);
                }
                //make question checkbox Object

                else if (questionSet.type === 2) {
                    var checkboxOptionIndex = [];
                    this.CheckboxOptionArray.forEach((checkboxIndex) => {
                        var CheckboxOptionRandomIndex = questionSet.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                        checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
                    })

                    var questionCheckbox = {
                        timer: this.remainingTime,
                        html: questionSet.html,
                        type: questionSet.type,
                        optionOriginalIndex: this.CheckboxOptionArray,
                        optionRandomIndex: checkboxOptionIndex
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
        this.QuestionSetOptionRadioButton = false;
        // check if this.questionArr.length is greater than index if greater than assign next question in this.question Object
        if (this.questionArr.length > this.index) {
            this.saveQuizToFirebase(this.Quiz, null)
            this.QuestionSetOption = false;
            this.QuestionSetOptionRadioButton = false;
            this.question = this.questionArr[this.index];

        }
        // check if this.questionArr.length is  equal to index if equal to then show save button
        if ((this.questionArr.length - 1) == this.index) {
            this.lastQuestion = true;
        }
        if (this.questionArr.length - 1 < this.index) {
            this.saveQuizToFirebase(this.Quiz, true)
        }

    }//nextQuestion show next question after liking on next button

    // save Quiz To firebase funtion start
    saveQuizToFirebase(quiz, lastQuestion) {
        var UserQuizObject = {
            userId: this.QuizSchedule.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        this._QuizService.saveQuizToFirebase(UserQuizObject, quiz, this.index).then(() => {
            if (lastQuestion) {
                this._navController.push(quizResultComponent, { quizId: this.QuizUniqueId });
            }
        })
        this.Quiz = [];
    }// save Quiz To firebase funtion end

}//startQuiz class end
