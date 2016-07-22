import {Component} from "@angular/core";

@Component({
  selector: "pass-result",
  template: `
  <ion-grid>
  <ion-row>
    <ion-col offset-35>
    <h1>Congratulations You Have Passed!</h1>
      <h2>Your Score: 100 %</h2>
      <h2>Passing Score: 100 %</h2>
      </ion-col>
  </ion-row>
</ion-grid>
  `
})

export class PassResultComponent {
  constructor() { }
}
