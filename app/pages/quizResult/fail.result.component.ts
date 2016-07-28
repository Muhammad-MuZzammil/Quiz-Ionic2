import {Component} from "@angular/core";
import {DateFormatPipe} from 'angular2-moment';
@Component({
  selector: "fail-result",
  template: `
    <h1>Sorry! You have failed!!</h1>
      <h2>Date: {{quizData.startTime | amDateFormat:'LL'}}</h2>
      <h2>Your Score: {{result.percentage}} %</h2>
      <h2>Correct Answers: {{result.correctAnswers}}</h2>
  `,
  pipes: [DateFormatPipe],
  inputs: ["result","quizData"]
})

export class FailResultComponent {
  constructor() { }
}
