
import {NavController, NavParams} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
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
    checkboxOption: boolean;
    duration: number;
    remainingTime: number;
    userObj;
    questionLenght: number;
    constructor(public _navController: NavController,
        public params: NavParams,
        private _QuizService: QuizService,
        private _groupQuizService: GroupQuizService) { }

    ngOnInit() {
        this.QuizParams = this.params.get('quizshow');
        this.GroupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.QuizUniqueId = this._groupQuizService.getQuizId(this.QuizParams);

        this.userObj = this._groupQuizService.getUserQuizData();
        this.duration = this._groupQuizService.groupQuiz[this.QuizParams].duration;

        if (this._QuizService.quizQuestionArr) {
            this.getQuizInfo(this._QuizService.quizQuestionArr, this._QuizService.quizQuestionKeyArray);
        } else {
            this._QuizService.getQuizInProgess(this.QuizUniqueId).then((res: any) => {
                this.getQuizInfo(res.quizArr, res.quizQuestionKeyArray);
            })
        }

    }// ngOnInit function end

    // get user quiz answer
    getQuizInfo(quizArr, quizQuestionKeyArray) {
        quizArr.forEach(questionDetail => {
            this.questionArr.push(questionDetail.question)
        });

        this.questionDetail = quizArr;
        this.questionKeyArray = quizQuestionKeyArray

        var UserQuizObject = {
            userId: this._groupQuizService.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        //calls to get user quiz answer data;
        this._QuizService.userQuiz(this.questionArr, UserQuizObject, this.questionKeyArray).then((response: any) => {
            if (response) {
                this.question = this.questionArr[response["question-started-index"]];
                this.questionLenght = this.questionArr.length;
                this.index = response["question-started-index"];
                this.remainingTime = response["duration"];
                // if last question then true 
                if (this.index === this.questionArr.length - 1) {
                    this.lastQuestion = true;
                }
                // console.log("this.index",this.index,this.questionArr.length, this.questionArr.length -1)
                else if(this.index === this.questionArr.length) {
                      this.saveQuizToFirebase(this.Quiz, true)
                }
                this.countdown("duration", this.duration, 0, this.remainingTime);
            }
        })
    }   // get user quiz answer end

    // show Timer
    countdown(element, minutes, seconds, remainingTime) {

        var time = remainingTime ? remainingTime : minutes * 60 + seconds;
        var interval = setInterval(() => {
            var el = document.getElementById(element);
            if (el) {
                if (time == 0) {
                    el.innerHTML = "Time's over!";
                    clearInterval(interval);
                    this.saveQuizToFirebase(this.Quiz, true)
                    return;
                }
                if (time) {
                    var minutes = Math.floor(time / 60);
                    if (minutes < 10) minutes = <any>"0" + minutes;
                    var seconds = time % 60;
                    if (seconds < 10) seconds = <any>"0" + seconds;
                    var text = minutes + ':' + seconds;
                    this.showTime = true;
                    el.innerHTML = text;
                    time--;
                    this.remainingTime = time
                }
            }
        }, 1000);// setInterval end
    }// show Timer end

    //function calls when RadioButtonSelectedOption outputs event tiger
    saveRadioButtonOption(radioOption, question) {

        // push radio button question details in Quiz Array
        if (radioOption) {
            this.Quiz.push(radioOption)
            this.nextQuestion();
        }

    }//function calls when RadioButtonSelectedOption outputs event function end

    //function calls when CheckboxSelectedOption outputs event tiger
    saveCheckboxOption(checkboxOption, question) {
        if (checkboxOption) {
            this.Quiz.push(checkboxOption)
            this.nextQuestion()
        }
    }//function calls when CheckboxSelectedOption outputs event function end

    // //function calls when CheckboxSelectedOption outputs event tiger
    savequestionSetOption(questionSetOption, question) {

        if (questionSetOption) {
            this.Quiz.push(questionSetOption)
            this.nextQuestion()
        }
    }//function calls when CheckboxSelectedOption outputs event function end

    //nextQuestion show next question after liking on next button

    nextQuestion() {
        this.index++;
        // check if this.questionArr.length is greater than index if greater than assign next question in this.question Object
        if (this.questionArr.length > this.index) {

            this.saveQuizToFirebase(this.Quiz, null)
            this.QuestionSetOption = false;
            // this.QuestionSetOptionRadioButton = false;
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
            userId: this._groupQuizService.getCurrentUser(),
            groupId: this.GroupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizUniqueId
        }
        this._QuizService.saveQuizToFirebase(UserQuizObject, quiz, this.index).then(() => {
            if (submit) {
                this._navController.push(quizResultComponent, { quizId: this.QuizUniqueId, groupId: this.GroupId, subgroupId: this.subgroupId });
            }
        })
        this.Quiz = [];
    }// save Quiz To firebase funtion end

}//startQuiz class end
