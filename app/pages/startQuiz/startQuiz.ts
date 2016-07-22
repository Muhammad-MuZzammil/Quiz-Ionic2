
import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {QuizService} from "./quizService";
import {quizResultComponent} from "../quizResult/quizResult";
import {QuestionRadioTypeComponent} from "./questionRadioType";
import {QuestionCheckboxTypeComponent} from "./questionCheckboxType";
import {QuestionSetSelectedOption} from "./questionSetType";
import {Observable} from 'rxjs/observable'
import {GroupQuizService} from "./../services/getUserGroupQuiz";
@Component({
    templateUrl: 'build/pages/startQuiz/startQuiz.html',
    directives: [QuestionRadioTypeComponent, QuestionCheckboxTypeComponent, QuestionSetSelectedOption]

})
export class startQuiz implements OnInit {
// this.groupQuizService.getUserData()
    questionArr: any[] = [];
    questionDetail: any[] = [];
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
    userObj;
    constructor(public _navController: NavController,
        public params: NavParams,
        private QuizSchedule: GetGroupQuizSchedule,
        private _QuizService: QuizService,
        private _groupQuizService: GroupQuizService) { }

    ngOnInit() {
        this.QuizParams = this.params.get('quizshow');
        this.GroupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.QuizUniqueId = this.QuizSchedule.getQuizId(this.QuizParams);

        this.userObj = this._groupQuizService.getUserQuizData();
        this.duration = this.QuizSchedule.groupQuiz[this.QuizParams].duration;

        if (this._QuizService.quizQuestionArr) {
            this.getQuizInfo(this._QuizService.quizQuestionArr, this._QuizService.quizQuestionKeyArray);
        } else {
            this._QuizService.getQuizInProgess(this.QuizUniqueId).then((res: any) => {
                this.getQuizInfo(res.quizArr, res.quizQuestionKeyArray);
            })
        }

    }// ngOnInit function end
    getQuizInfo(quizArr, quizQuestionKeyArray) {
        quizArr.forEach(questionDetail => {
            this.questionArr.push(questionDetail.question)
        });

        this.questionDetail = quizArr;
        this.questionKeyArray = quizQuestionKeyArray
        // this.questionKeyArray = quizQuestionKeyArray;

        var UserQuizObject = {
            userId: this.QuizSchedule.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        this._QuizService.userQuiz(this.questionArr, UserQuizObject, this.questionKeyArray).then((response: any) => {
            if (response) {
                this.question = this.questionArr[response["question-started-index"]];
                this.index = response["question-started-index"];
                if (this.index === this.questionArr.length - 1) {
                    this.lastQuestion = true;
                }
                // var questionStartedIndex = this.index ? this.questionArr.length - this.index : this.index;
                // this.userAnswer = response.questions[questionStartedIndex];
                // for (var questionOriginalKey in this.userAnswer) {
                //     this.remainingTime = this.userAnswer[questionOriginalKey]["timer"]
                // }
                this.countdown("duration", this.duration, 0, this.remainingTime);
            }
        })
    }
    // show Timer
    countdown(element, minutes, seconds, remainingTime) {
        var time = remainingTime ? remainingTime : minutes * 60 + seconds;
        var interval = setInterval(() => {
            var el = document.getElementById(element);
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
            el.innerHTML = text;
            time--;
            this.remainingTime = time

        }, 1000);// setInterval end
    }// show Timer end

    //function calls when RadioButtonSelectedOption outputs event tiger
    saveRadioButtonOption(radioOption, question) {
        this.optionRadioButton = true;
        var questionIndex = this.questionArr.indexOf(question); // find index of question index
        var questionKey = this.questionKeyArray[questionIndex] // get data of question by giving index
        // push radio button question details in Quiz Array
        this.Quiz.push({
            timer: this.remainingTime,
            type: radioOption.type,
            optionOriginalIndex: radioOption.optionOriginalIndex,
            questionKey: questionKey,
            bookId: question.bookId,
            chapterId: question.chapterId,
            topicId: question.topicId
        })
        this.nextQuestion()
    }//function calls when RadioButtonSelectedOption outputs event function end

    //function calls when CheckboxSelectedOption outputs event tiger
    saveCheckboxOption(checkboxOption, question) {
        var questionIndex = this.questionArr.indexOf(question); // find index of question index

        var questionKey = this.questionKeyArray[questionIndex]
        if (checkboxOption) {
            this.Quiz.push({
                timer: this.remainingTime,
                type: checkboxOption.type,
                optionOriginalIndex: checkboxOption.optionOriginalIndex,
                questionKey: questionKey,
                bookId: question.bookId,
                chapterId: question.chapterId,
                topicId: question.topicId
            })
            this.nextQuestion()
        }
    }//function calls when CheckboxSelectedOption outputs event function end

    // //function calls when CheckboxSelectedOption outputs event tiger
    savequestionSetOption(questionSetOption, question) {
        var questionIndex = this.questionArr.indexOf(question); // find index of question index
        var questionKey = this.questionKeyArray[questionIndex]
        if (questionSetOption) {
            this.Quiz.push({
                timer: this.remainingTime,
                html: question.html,
                type: question.type,
                questiones: questionSetOption,
                questionKey: questionKey,
                bookId: question.bookId,
                chapterId: question.chapterId,
                topicId: question.topicId
            })
            this.nextQuestion()
        }
    }//function calls when CheckboxSelectedOption outputs event function end

    //nextQuestion show next question after liking on next button

    nextQuestion() {
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
    saveQuizToFirebase(quiz, submit) {
        var UserQuizObject = {
            userId: this.QuizSchedule.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        this._QuizService.saveQuizToFirebase(UserQuizObject, quiz, this.index).then(() => {
            if (submit) {
                this._navController.push(quizResultComponent, { quizId: this.QuizUniqueId, groupId: this.GroupId,subgroupId: this.subgroupId  });
            }
        })
        this.Quiz = [];
    }// save Quiz To firebase funtion end

}//startQuiz class end
