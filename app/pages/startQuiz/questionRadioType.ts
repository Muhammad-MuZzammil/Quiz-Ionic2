import {Component, EventEmitter} from "@angular/core";

interface RadioType {
  timer: number,
  questionKey: string,
  bookId: string,
  chapterId: string,
  topicId: string,
  type: number,
  optionOriginalIndex: number
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
  inputs: ["questionRadio", "isLastQuestion", "remainingTime"],
  outputs: ["RadioButtonSelectedOption"]
})

export class QuestionRadioTypeComponent {
  RadioButtonSelectedOption: EventEmitter<Object> = new EventEmitter();
  questionRadio;
  radioQuestionDetail: RadioType;
  optionRadioButton: boolean = false;
  radioButtonArray: Array<Object> = [];
  remainingTime: number
  selectOption(option) {
    //  var radioButtonArray = [];
    this.radioButtonArray = []
    let radioButtonOption = parseInt(option)
    this.radioButtonArray.push({ radioButtonOptionIndex: radioButtonOption })
    var radioButtonOptionRandomIndex = this.questionRadio.options.length - (radioButtonOption + 1);

    this.radioQuestionDetail = {
      timer: this.remainingTime,
      questionKey: this.questionRadio.questionKey,
      bookId: this.questionRadio.bookId,
      chapterId: this.questionRadio.chapterId,
      topicId: this.questionRadio.topicId,
      type: 1,
      optionOriginalIndex: radioButtonOption
    }
    this.optionRadioButton = true;
  }

  nextQuestion() {
    this.RadioButtonSelectedOption.emit(this.radioQuestionDetail);
  }
}
