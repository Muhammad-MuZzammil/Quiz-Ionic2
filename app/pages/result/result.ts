
import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home'
import {startQuiz} from '../startQuiz/startQuiz'

@Component({
  templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {
    constructor(public _navController : NavController){
    }
     startQuiz(){
      this._navController.push(startQuiz);
    }
}
