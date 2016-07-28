import {Component} from "@angular/core";
import {NavParams, Loading, NavController} from 'ionic-angular';
import {FailResultComponent} from "./fail.result.component";
import {PassResultComponent} from "./pass.result.component";
import {Http, Headers, RequestOptions} from '@angular/http';
// import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
import {HttpService} from "./../services/httpService";
import {GroupQuizService} from "./../services/getUserGroupQuiz"
@Component({
  templateUrl: "build/pages/quizResult/quizResult.html",
  directives: [FailResultComponent, PassResultComponent]
})
export class quizResultComponent {
  passingMarks;
  quiz: any
  groupId: NavParams
  subgroupId: NavParams
  loading: Loading
  QuizData;
  isPassed: boolean;
  isFailed: boolean;
  result
  constructor(private params: NavParams,
    public http: Http,
    private _navController: NavController,
    private _httpService: HttpService,
    private GroupQuizService: GroupQuizService
  ) {
    this.quiz = this.params.get("quizId");
    this.groupId = this.params.get("groupId");
    this.subgroupId = this.params.get("subgroupId");
    this.QuizData = this.GroupQuizService.groupQuiz[this.GroupQuizService.groupQuizId.indexOf(this.quiz)];
  }

  ionViewLoaded() {
    // get all quiz Schedule and show in cards;
    this.loading = Loading.create({
      content: 'Please wait...'
    });
    this._navController.present(this.loading);

    var UserQuizObject = {
      userId: this.GroupQuizService.getCurrentUser(),
      groupId: this.groupId,
      subgroupId: this.subgroupId,
      quizId: this.quiz,
    }
    let body = JSON.stringify(UserQuizObject);
    let url = 'https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/quizresult';
    this._httpService.httpPost(url, body) // call httpService httpPost method 
      .subscribe((res) => {
        this.loading.dismiss()
        if (res.data) {
          if (this.QuizData["passing-marks"] <= res.data.percentage) {
            this.isPassed = true;
            this.result = res.data
          }
          else {
            this.isFailed = true;
            this.result = res.data
          }
        }

      });// subscribe end
  }
}
