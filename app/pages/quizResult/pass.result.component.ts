import {Component} from "@angular/core";

@Component({
  selector: "pass-result",
  template: `
  <ion-grid>
  <ion-row>
    <ion-col offset-35>
    <h1>Congratulations You Have Passed!</h1>
      <h2>Your Score: {{result.percentage}} %</h2>
      <h2>Correct Answers: {{result.correctAnswers}}</h2>
      </ion-col>
  </ion-row>
</ion-grid>
  `,
  inputs: ["result"]
})

export class PassResultComponent {
  constructor() { }
}
