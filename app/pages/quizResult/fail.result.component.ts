import {Component} from "@angular/core";
@Component({
  selector: "fail-result",
  template: `
    <h1>Sorry! You have failed!!</h1>
      <h2>Your Score: {{result.percentage}} %</h2>
      <h2>Correct Answers: {{result.correctAnswers}}</h2>
  `,
  inputs: ["result"]
})

export class FailResultComponent {
  constructor() { }
}
