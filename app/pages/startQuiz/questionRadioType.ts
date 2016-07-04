import {Component, EventEmitter} from "@angular/core";

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

  `,
  inputs: ["questionRadio"],
  outputs: ["RadioButtonSelectedOption"]
})

export class QuestionRadioTypeComponent {
  RadioButtonSelectedOption: EventEmitter<Object> = new EventEmitter();
  questionRadio
  selectOption(option) {
    // console.log(this.questionRadio, "questionRadio.options")
    var radioButtonOptionIndex = parseInt(option)
    var radioButtonOptionRandomIndex = this.questionRadio.options.length - (radioButtonOptionIndex + 1);
    var radioQuestionDetail = {
      type: 1,
      optionOriginalIndex: radioButtonOptionIndex,
      optionRandomIndex: radioButtonOptionRandomIndex,
    }
    this.RadioButtonSelectedOption.emit(radioQuestionDetail);
  }

}
