import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {ResultPage} from '../result/result';
import {GroupQuizService} from "../services/getUserGroupQuiz";

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
    constructor(public _navController: NavController, public params: NavParams, private _groupQuizService: GroupQuizService) {
        this.QuizId = this.params.get('quizIdIndex');
        this.groupId = this.params.get('groupId');
        this.subgroupId = this.params.get('subgroupId');
        this.userId = this._groupQuizService.getCurrentUser();
    }

    checkProtectKey(ProtectedKey) {
        console.log("=========================================================");
        console.log(ProtectedKey);
        let obj = {
            groupId: this.groupId,
            subgroupId: this.subgroupId,
            quizId: this.QuizId,
            userId: this.userId,
            protectedKey: ProtectedKey
        }
        this._navController.push(ResultPage, { quizIdIndex: this.QuizId, groupId: this.groupId, subgroupId: this.subgroupId });
    }
}

