import {Component} from "@angular/core";
import {NavController, Loading} from 'ionic-angular';
import {ResultPage} from '../result/result';
import {GetGroupQuizSchedule} from "./GetGroupQuizSchedule";
import {CalendarPipe} from 'angular2-moment';


import 'rxjs/add/operator/toPromise';

@Component({
    pipes: [CalendarPipe],
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    groupQuiz: any = [];
    quizObj: any = {}
    constructor(private _navController: NavController, private _GetGroupQuizSchedule: GetGroupQuizSchedule) {
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
    // can user can give quiz or not
    checkIsQuizCanGiven(quizObj, index) {
        this.quizObj = {
            "quizId": this._GetGroupQuizSchedule.getQuizId(index),
            "scheduleId": quizObj.scheduleId,
            "subgroupId": quizObj.subgroupId,
            "userId": this._GetGroupQuizSchedule.getCurrentUser(),
            "groupId": quizObj.groupId
        }
        // call _GetGroupQuizSchedule.checkQuizSchedule function
        this._GetGroupQuizSchedule.checkQuizSchedule
            (this.quizObj).subscribe((res) => {
                (res.json());
                if (res.json().statusCode == 0) {
                    this._navController.push(ResultPage, { quizIdIndex: index })
                }else {
                }
            });//subscribe end
    }// checkIsQuizCanGiven end

}
