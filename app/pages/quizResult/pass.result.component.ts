import {Component} from "@angular/core";
import {DateFormatPipe} from 'angular2-moment';
@Component({
  selector: "pass-result",
  template: `
  <ion-grid>
  <ion-row>
    <ion-col offset-35>
    <h1>Congratulations You Have Passed!</h1>
      <h2>Date: {{quizData.startTime  | amDateFormat:'LL'}}</h2>
      <h2>Your Score: {{result.percentage}} %</h2>
      <h2>Correct Answers: {{result.correctAnswers}}</h2>
      </ion-col>
  </ion-row>
</ion-grid>
  `,
  pipes: [DateFormatPipe],
  inputs: ["result","quizData"]
})

export class PassResultComponent {
  constructor() { }
}
