import {Component} from "@angular/core";
import {NavController, NavParams,LoadingController} from 'ionic-angular';
import {ResultPage} from '../result/result';
import {GroupQuizService} from "../services/getUserGroupQuiz";
import {HttpService} from "./../services/httpService";
import {tot} from "./../../app";
@Component({
    template: `
      <ion-header>
             <ion-navbar hideBackButton>
                  Welcome to Quiz Page
             </ion-navbar>
    </ion-header>
    <ion-content>
        <form (ngSubmit)="checkProtectKey(protectedKey.value)">
        <ion-item>
              <ion-label floating>Protected Key</ion-label>
              <ion-input type="text" #protectedKey></ion-input>
         </ion-item>
         <div *ngIf="showError" style="color:red;">{{errorMessage}}</div>
        <button type="submit" medium seagreen >Submit Protected Key</button>  
        </form> 
    </ion-content>
    `
})

export class ProtectedKeyComponent {
    protectedKey: string = "";
    QuizId;
    groupId: string;
    subgroupId: string;
    userId: string;
    errorMessage: string;
    showError: boolean = false;
    constructor(public _navController: NavController, public params: NavParams, private _groupQuizService: GroupQuizService, private _httpService: HttpService,private _loading: LoadingController) {
        this.QuizId = this.params.get('quizIdIndex');
        this.groupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.userId = this._groupQuizService.getCurrentUser();
    }

    checkProtectKey(ProtectedKey) {
           let loading = this._loading.create({
            content: 'Please wait...'
        });
        loading.present(loading);
        this.showError = false;
        let obj = {
            groupId: this.groupId,
            subgroupId: this.subgroupId,
            quizId: this._groupQuizService.getQuizId(this.QuizId),
            userId: this.userId,
            protectedKey: ProtectedKey
        }
        let body = JSON.stringify(obj);
        let url = `${tot + "checkingProctingKey"}`
        this._httpService.httpPost(url, body) // call httpService httpPost method 
            .subscribe((res) => {
                if (res.statusCode == 0) {
                    loading.dismiss();
                    this._navController.push(ResultPage, { quizIdIndex: this.QuizId, groupId: this.groupId, subgroupId: this.subgroupId });
                }// if statement end inside subscribe
                else {
                    this.errorMessage = "Key does not match";
                    this.showError = true;
                    loading.dismiss();
                }
            }, (error) => {
                loading.dismiss();
                console.log("errrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
            });// subscribe function end
        // 
    }
}

