
import {Component} from "@angular/core";
import {NavController,NavParams} from 'ionic-angular';
import {HomePage} from '../home/home'
import {startQuiz} from '../startQuiz/startQuiz'
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";

@Component({
  templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {
  QuizId;
  QuizData;
    constructor(public _navController : NavController,public params: NavParams,private QuizSchedule: GetGroupQuizSchedule){
      this.QuizId = this.params.get('quizIdIndex');
      this.QuizData = this.QuizSchedule.groupQuiz[this.QuizId];

    }
     startQuiz(){
      this._navController.push(startQuiz,{quizshow: this.QuizId});
    }
}
