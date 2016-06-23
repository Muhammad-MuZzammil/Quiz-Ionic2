import {Component} from "@angular/core";
import {NavController,Loading} from 'ionic-angular';
import {ResultPage} from '../result/result';
import {GetGroupQuizSchedule} from "./GetGroupQuizSchedule";
import {CalendarPipe} from 'angular2-moment';


import 'rxjs/add/operator/toPromise';

@Component({
    pipes: [CalendarPipe],
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  groupQuiz :any = [];
  quizObj:any = {}
  constructor(private _navController: NavController,private _GetGroupQuizSchedule: GetGroupQuizSchedule) {
  }
  ngOnInit() {
    // get all quiz Schedule and show in cards;
    let loading = Loading.create({
      content: 'Please wait...'
   });
   this._navController.present(loading);

    this._GetGroupQuizSchedule.getQuiz().then((res) => {
      this.groupQuiz = res;
      loading.dismiss()
    });

  }//ngOnInit end

  checkIsQuizCanGiven(quizObj,index) {
    console.log(index)
    this.quizObj = {
                  "quizId": this._GetGroupQuizSchedule.getQuizId(index),
                  "scheduleId": quizObj.scheduleId,
                  "subgroupId": quizObj.subgroupId,
                  "userId": this._GetGroupQuizSchedule.getCurrentUser(),
                  "groupId":  quizObj.groupId
          }
        console.log(this.quizObj);
          this._GetGroupQuizSchedule.checkQuizSchedule
          (quizObj).subscribe((res)=> {
            console.log(res,"111111111111111111");
          })
              //  .subscribe(hero => {
              //    console.log(hero);
              //  })
       // TODO: Display error message

  //   console.log(quizObj)
  //   this.quizObj = {
  //               quizId: this._GetGroupQuizSchedule.getQuizId(index),
  //               scheduleId: quizObj.scheduleId,
  //               subgroupId: quizObj.subgroupId,
  //               userId: this._GetGroupQuizSchedule.getCurrentUser(),
  //               groupId:  quizObj.groupId,
  //       }
  //     this._GetGroupQuizSchedule.checkQuizSchedule(quizObj).subscribe((res) => {
  //         //  localStorage.setItem("token", );
  //         console.log(res);
  //         },
  //       (err) => console.log(err));	// http.post
  //       // this._router.navigate(["Company"]);
  //       // localStorage.setItem("id", "Arsalan");
  }

  results(index){
    // push on result page
         this._navController.push(ResultPage,{quizIdIndex: index})
  }
}
