import {Page , NavController} from 'ionic-angular';
import {HomePage} from '../home/home'
import {startQuiz} from '../startQuiz/startQuiz'

@Page({
  templateUrl: 'build/pages/result/result.html'
})
export class ResultPage {
    constructor(public nav : NavController){
    }
     startQuiz(){
      this.nav.push(startQuiz)
    }
}
  