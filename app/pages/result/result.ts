
import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
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
  givenQuiz
  quizData;
  totalQuestion: number;
  canQuizGiven: boolean;
  constructor(public _navController: NavController, public params: NavParams, private quiz: QuizService, private groupQuizService: GroupQuizService, private _ResultQuizService: ResultQuizService) {
    this.QuizId = this.params.get('quizIdIndex');
    this.quiz.getQuizInProgess(this.groupQuizService.getQuizId(this.QuizId)).then((res: any) => {
      this.totalQuestion = res.quizArr.length;
    });
    this.QuizData = this.groupQuizService.groupQuiz[this.QuizId];
    this._ResultQuizService.checkIsQuizGiven(this.QuizData, this.groupQuizService.getQuizId(this.QuizId), this.groupQuizService.getCurrentUser()).then((res) => {
      if (res) {
        this.givenQuiz = res;
        this.canQuizGiven = res["is-quiz-given"]
      }

    })


  }
  gotostartQuiz() {
    this._navController.push(startQuiz, { quizshow: this.QuizId, groupId: this.QuizData.groupId, subgroupId: this.QuizData.subgroupId });
  }
}
