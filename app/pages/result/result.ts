
import {Component} from "@angular/core";
import {NavController, NavParams, Loading} from 'ionic-angular';
import {HomePage} from '../home/home'
import {startQuiz} from '../startQuiz/startQuiz'
import {QuizService} from '../startQuiz/quizService'
import {GroupQuizService} from "./../services/getUserGroupQuiz";
// import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {ResultQuizService} from "./result.service.component";
import {PassResultComponent} from "./../quizResult/pass.result.component"
import {FailResultComponent} from "./../quizResult/fail.result.component"
import {DateFormatPipe} from 'angular2-moment';

@Component({
  templateUrl: 'build/pages/result/result.html',
  directives: [FailResultComponent, PassResultComponent],
  pipes: [DateFormatPipe]
})
export class ResultPage {
  QuizId: string;
  QuizData;
  givenQuiz: any = [];
  quizData;
  Loading: Loading;
  protectedKey
  startQuiz: boolean = false;
  totalQuestion: number;
  canQuizGiven: boolean = false;
  constructor(public _navController: NavController, public params: NavParams, private quiz: QuizService, private groupQuizService: GroupQuizService, private _ResultQuizService: ResultQuizService) {
    this.QuizId = this.params.get('quizIdIndex');
    this.quiz.getQuizInProgess(this.groupQuizService.getQuizId(this.QuizId)).then((res: any) => {
      this.totalQuestion = null;
      this.totalQuestion = res.quizArr.length;
      this.protectedKey = res.protectedKey
    });
    this.QuizData = this.groupQuizService.groupQuiz[this.QuizId];

  }
  ionViewWillEnter() {
    this._ResultQuizService.checkIsQuizGiven(this.QuizData, this.groupQuizService.getQuizId(this.QuizId), this.groupQuizService.getCurrentUser()).then((res) => {
      if (res === "Null") {
        this.startQuiz = false;
        this.canQuizGiven = true
      }
      else {
        this.givenQuiz = res;
        this.startQuiz = true;
        this.canQuizGiven = true;
        // this.Loading.dismiss()
      }
    })
  }
  gotostartQuiz() {
    console.log("======================================================")
    console.log(this.protectedKey);
    if(this.protectedKey) {

    }else {
       this._navController.push(startQuiz, { quizshow: this.QuizId, groupId: this.QuizData.groupId, subgroupId: this.QuizData.subgroupId });      
    }
  }
}
