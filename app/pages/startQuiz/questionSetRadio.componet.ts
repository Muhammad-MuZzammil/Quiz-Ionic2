import {Component, EventEmitter} from "@angular/core";

@Component({
    selector: "question-set-radio-type",
    template:`
           <ion-list radio-group *ngIf="question.type === 1" [(ngModel)]="QuestionSetOptionRadioButton">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{questionIndex + 1}}</b>
                  <div [innerHTML]="question.html"></div>
              </div>
              <ion-item *ngFor="let option of question.options; let radioOptionIndex = index"  text-wrap>
                  <ion-radio value="{{radioOptionIndex}}" (click)="savequestion(null,radioOptionIndex,null)"></ion-radio>
                  <ion-label [innerHTML]="option.html" ></ion-label>
              </ion-item>
          </ion-list>
    `,
    inputs: ["question","questionIndex"],
    outputs: ["radioOption"]
})

export class QuestionSetRadioComponent {
    radioOption: EventEmitter<Object> = new EventEmitter();
    constructor() { }

    savequestion(checked,checkboxOptionIndex,questionIndex) {
        this.radioOption.emit({
            radioButtonIndex: checkboxOptionIndex,
        })
    }
}