import {Component, EventEmitter} from "@angular/core";

interface RadioType {
  type: number,
  optionOriginalIndex: number,
  optionRandomIndex: number
}

@Component({
  selector: "radio-type",
  template: `
  <h2 text-center>Options</h2>
  <ion-list radio-group [(ngModel)]="optionRadioButton" padding>
        <ion-item *ngFor="let option of questionRadio.options let i = index">
            <ion-label [innerHTML]="option.html"></ion-label>
            <ion-radio value="{{i}}" (click)="selectOption(i)"></ion-radio>
        </ion-item>
    </ion-list>
    <ion-buttons end>
        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="!isLastQuestion" [disabled]="!optionRadioButton">Next</button>

        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="isLastQuestion" [disabled]="!optionRadioButton ">Save</button>
    </ion-buttons>
  `,
  inputs: ["questionRadio","isLastQuestion"],
  outputs: ["RadioButtonSelectedOption"]
})

export class QuestionRadioTypeComponent {
  RadioButtonSelectedOption: EventEmitter<Object> = new EventEmitter();
  questionRadio;
  radioQuestionDetail: RadioType;
  optionRadioButton: boolean = false;
  selectOption(option) {

    var radioButtonOptionIndex = parseInt(option)
    var radioButtonOptionRandomIndex = this.questionRadio.options.length - (radioButtonOptionIndex + 1);

    this.radioQuestionDetail = {
      type: 1,
      optionOriginalIndex: radioButtonOptionIndex,
      optionRandomIndex: radioButtonOptionRandomIndex,
    }

    this.optionRadioButton = true;
  }

  nextQuestion() {
    this.RadioButtonSelectedOption.emit(this.radioQuestionDetail);
  }
}
