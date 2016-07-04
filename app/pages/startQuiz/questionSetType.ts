import {Component } from "@angular/core";

@Component( {
  selector: "question-set-type",
  template: `
  <div *ngFor="let questionSet of questionSet.questiones; let i = index" >
          <ion-list radio-group *ngIf="questionSet.type === 1" [(ngModel)]="QuestionSetOptionRadioButton">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{i + 1}}</b>
                  <div [innerHTML]="questionSet.html"></div>
              </div>
              <ion-item *ngFor="let option of questionSet.options; let optionIndex = index">
                  <ion-radio value="{{optionIndex}}"></ion-radio>
                  <ion-label [innerHTML]="option.html" (ionSelect)="active(QuestionSetOptionRadioButton)"></ion-label>
              </ion-item>
          </ion-list>
          <ion-list *ngIf="questionSet.type === 2">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{i + 1}}</b>
                  <div [innerHTML]="questionSet.html"></div>
              </div>
              <ion-item *ngFor="let option of questionSet.options; let i = index">
                  <ion-checkbox (ionChange)="savequestion(option.html,checkbox.checked,3,i)" #checkbox [checked]=false></ion-checkbox>
                  <ion-label [innerHTML]="option.html"></ion-label>
              </ion-item>
          </ion-list>
      </div>
  `,
  inputs: ["questionSet"],
  outputs:["questionSetSelectedOption"]
})
export class QuestionSetSelectedOption {

}
