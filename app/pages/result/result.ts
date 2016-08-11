
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
  startQuiz: boolean = false;
  totalQuestion: number;
  canQuizGiven: boolean = false;
  groupId: string;
  subgroupId: string;
  constructor(public _navController: NavController, public params: NavParams, private quiz: QuizService, private groupQuizService: GroupQuizService, private _ResultQuizService: ResultQuizService) {
    this.QuizId = this.params.get('quizIdIndex');
    this.groupId = this.params.get('groupId');
    this.subgroupId = this.params.get('subgroupId');
    this.quiz.getQuizInProgess(this.groupId,this.subgroupId,this.groupQuizService.getQuizId(this.QuizId)).then((res: any) => {
      this.totalQuestion = null;
      this.totalQuestion = res.quizArr.length;
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
       this._navController.push(startQuiz, { quizshow: this.QuizId, groupId: this.QuizData.groupId, subgroupId: this.QuizData.subgroupId });      
  }
}
