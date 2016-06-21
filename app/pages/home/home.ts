import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {ResultPage} from '../result/result';
import {GetGroupQuizSchedule} from "./GetGroupQuizSchedule";
import {CalendarPipe} from 'angular2-moment';

@Component({
    pipes: [CalendarPipe],
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  groupQuiz :any = [];
  constructor(private _navController: NavController,private _GetGroupQuizSchedule: GetGroupQuizSchedule) {
  }
  ngOnInit() {
    // get all quiz Schedule and show in cards;
    this._GetGroupQuizSchedule.getQuiz().then((res) => {
      this.groupQuiz = res;
    });

  }//ngOnInit end
  
  results(index){
    // push on result page
         this._navController.push(ResultPage,{quizIdIndex: index})
  }
}
