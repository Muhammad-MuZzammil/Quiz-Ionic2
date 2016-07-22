
import {Component} from "@angular/core";
import {NavController,NavParams} from 'ionic-angular';
import {HomePage} from '../home/home'
import {startQuiz} from '../startQuiz/startQuiz'
import {QuizService} from '../startQuiz/quizService'

import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";

@Component({
  templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {
  QuizId: string;
  QuizData;
  quizData;
  totalQuestion: number;
    constructor(public _navController : NavController,public params: NavParams,private QuizSchedule: GetGroupQuizSchedule,private quiz: QuizService){
      this.QuizId = this.params.get('quizIdIndex');
     this.quiz.getQuizInProgess(this.QuizSchedule.getQuizId(this.QuizId)).then((res: any) => {
       this.totalQuestion = res.quizArr.length;
     });

      this.QuizData = this.QuizSchedule.groupQuiz[this.QuizId];
    }
     gotostartQuiz(){
      this._navController.push(startQuiz,{quizshow: this.QuizId, groupId: this.QuizData.groupId, subgroupId: this.QuizData.subgroupId});
    }
}
