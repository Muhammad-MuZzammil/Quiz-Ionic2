import {Component} from "@angular/core";
import {NavController, Loading} from 'ionic-angular';
import {ResultPage} from '../result/result';
// import {GetGroupQuizSchedule} from "./GetGroupQuizSchedule";
import {QuizCardHtml} from "./quizCard";
import {HttpService} from "./../services/httpService";
import {GroupQuizService} from "./../services/getUserGroupQuiz";


import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'build/pages/home/home.html',
    directives: [QuizCardHtml]
})
export class HomePage {
    groupQuiz: any = [];
    quizObj: any = {};
    loading: Loading
    constructor(private _navController: NavController, private _httpService: HttpService, private _groupQuizService: GroupQuizService) { }
    ngOnInit() {
        // get all quiz Schedule and show in cards;
        this.loading = Loading.create({
            content: 'Please wait...'
        });
        this._navController.present(this.loading);
        this._groupQuizService.getQuiz().then((res) => {
            this.groupQuiz = [];
            this.groupQuiz = res;
            this.loading.dismiss()
        });

    }//ngOnInit end
    
    // can user can give quiz or not
    checkIsQuizCanGiven(quizObj, index) {
        this.loading = Loading.create({
            content: 'Please wait...'
        });
        this._navController.present(this.loading);

        this.quizObj = {
            "quizId": this._groupQuizService.getQuizId(quizObj.index),
            "scheduleId": quizObj.quiz.scheduleId,
            "subgroupId": quizObj.quiz.subgroupId,
            "userId": this._groupQuizService.getCurrentUser(),
            "groupId": quizObj.quiz.groupId
        }
        this._groupQuizService.UserData(this.quizObj);
        // // call _GetGroupQuizSchedule.checkQuizSchedule function
        let body = JSON.stringify(this.quizObj);
        let url = "https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/checkquizschedule";
        this._httpService.httpPost(url, body) // call httpService httpPost method 
            .subscribe((res) => {
                if (res.statusCode == 0) {
                    this.loading.dismiss()
                    this._navController.push(ResultPage, { quizIdIndex: quizObj.index })
                } else {
                    this.loading.dismiss()
                }
            },(err)=> {
                console.log("Error",err)
                this.loading.dismiss()
            });// subscribe function end
    }// checkIsQuizCanGiven end

}
