import {Component} from "@angular/core";
import {NavParams, Loading, NavController} from 'ionic-angular';
import {FailResultComponent} from "./fail.result.component";
import {PassResultComponent} from "./pass.result.component";
import {Http, Headers, RequestOptions} from '@angular/http';
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";
@Component({
  templateUrl: "build/pages/quizResult/quizResult.html",
  directives: [FailResultComponent, PassResultComponent]
})
export class quizResultComponent {
  passingMarks;
  quiz: NavParams
  groupId: NavParams
  subgroupId: NavParams
  loading: Loading
  constructor(private params: NavParams,
    public http: Http,
    private _navController: NavController,
    private QuizSchedule: GetGroupQuizSchedule
  ) {
    this.quiz = this.params.get("quizId");
    this.groupId = this.params.get("groupId");
    this.subgroupId = this.params.get("subgroupId");
  }

  ionViewLoaded() {
    // get all quiz Schedule and show in cards;
    this.loading = Loading.create({
      content: 'Please wait...'
    });
    this._navController.present(this.loading);

    var UserQuizObject = {
      userId: this.QuizSchedule.getCurrentUser(),
      groupId: this.groupId,
      subgroupId: this.subgroupId,
      quizId: this.quiz,
    }
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    console.log(UserQuizObject, "UserQuizObject")
    this.http.post('https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/quizresult', JSON.stringify(UserQuizObject), options)
      .subscribe((res) => {
        this.loading.dismiss()
        console.log("quiz Result: ", res.json());
      });// subscribe end
  }
}
