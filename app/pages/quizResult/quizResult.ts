import {Component} from "@angular/core";
import {NavParams, LoadingController, NavController} from 'ionic-angular';
import {FailResultComponent} from "./fail.result.component";
import {PassResultComponent} from "./pass.result.component";
import {Http, Headers, RequestOptions} from '@angular/http';
import {HomePage} from "../home/home";
// import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {HttpService} from "./../services/httpService";
import {GroupQuizService} from "./../services/getUserGroupQuiz"
import {tot} from "./../../app";
@Component({
  templateUrl: "build/pages/quizResult/quizResult.html",
  directives: [FailResultComponent, PassResultComponent]
})
export class quizResultComponent {
  passingMarks;
  quiz: any
  groupId: NavParams
  subgroupId: NavParams

  QuizData;
  isPassed: boolean;
  isFailed: boolean;
  result = {}
  constructor(private params: NavParams,
    public http: Http,
    private _navController: NavController,
    private _httpService: HttpService,
    private GroupQuizService: GroupQuizService,
    private Loading: LoadingController
  ) {
    this.quiz = this.params.get("quizId");
    this.groupId = this.params.get("groupId");
    this.subgroupId = this.params.get("subgroupId");
    this.QuizData = this.GroupQuizService.groupQuiz[this.GroupQuizService.groupQuizId.indexOf(this.quiz)];
  }

  ionViewLoaded() {
    // get all quiz Schedule and show in cards;
    let loading = this.Loading.create({
      content: 'Please wait...'
    });
    loading.present(loading);

    var UserQuizObject = {
      userId: this.GroupQuizService.getCurrentUser(),
      groupId: this.groupId,
      subgroupId: this.subgroupId,
      quizId: this.quiz
    }
    let body = JSON.stringify(UserQuizObject);
    let url = `${ tot + "quizresult" }`;
    this._httpService.httpPost(url, body) // call httpService httpPost method 
      .subscribe((res) => {
        if (res.data) {
          if (this.QuizData["passing-marks"] <= res.data.percentage) {
            this.isPassed = true;
            this.result = res.data;
            loading.dismiss();
          }
          else {
            this.result = res.data;
            this.isFailed = true;
            loading.dismiss()
          }
        }
      });// subscribe end
  }
  goToHome() {
    this._navController.push(HomePage)
  }
}
