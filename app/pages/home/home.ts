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

    this._GetGroupQuizSchedule.getQuiz().then((res) => {
      console.log(res,"11111111111111111111111111111");
      this.groupQuiz = res;
      console.log(this._GetGroupQuizSchedule.getQuizIndex(1))

    });

  }
  results(index){
      this._GetGroupQuizSchedule.getQuizIndex(1)

         this._navController.push(ResultPage,{quizId:this._GetGroupQuizSchedule.getQuizIndex(1)})


  }
  /*
    pushPage(){
      this._navController.push(SomeImportedPage, { userId: "12345"});
    }
  */
}
