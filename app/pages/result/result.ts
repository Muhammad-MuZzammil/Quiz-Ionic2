
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
    constructor(public _navController : NavController,public params: NavParams,private QuizSchedule: GetGroupQuizSchedule){
      this.QuizId = this.params.get('quizId');
          alert(this.QuizId)
      this.QuizId = this.QuizSchedule.groupQuizId.indexOf(this.QuizSchedule.groupQuizId)
      console.log(this.QuizSchedule.groupQuizId)
      console.log(this.QuizId.toString())

    }
     startQuiz(){
      this._navController.push(startQuiz);
    }
}
