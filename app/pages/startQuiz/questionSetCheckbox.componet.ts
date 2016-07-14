import {Component, EventEmitter} from "@angular/core";

@Component({
    selector: "question-set-checkbox-type",
    template:`
         <ion-list *ngIf="question.type === 2">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{questionIndex + 1}}</b>
                  <div [innerHTML]="question.html"></div>
              </div>
              <ion-item *ngFor="let option of question.options; let checkboxOptionIndex = index">
                  <ion-checkbox (ionChange)="savequestion(checkbox.checked,checkboxOptionIndex,questionIndex)" #checkbox [checked]=false></ion-checkbox>
                  <ion-label [innerHTML]="option.html"></ion-label>
              </ion-item>
          </ion-list>
    `,
    inputs: ["question","questionIndex"],
    outputs: ["checkboxOption"]
})

export class QuestionSetCheckboxComponent {
    checkboxOption: EventEmitter<Object> = new EventEmitter();
    constructor() { }

    savequestion(checked,checkboxOptionIndex,questionIndex) {
        this.checkboxOption.emit({
            checked: checked,
            checkboxOptionIndex: checkboxOptionIndex,
            questionIndex: questionIndex
        })
    }
}