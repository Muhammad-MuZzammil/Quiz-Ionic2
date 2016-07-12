import {Component} from "@angular/core";

@Component({
  selector: "pass-result",
  template: `
  <div>
      <h1>Congratulations You Have Passed!</h1>
      <h2>Your Score: 100 %</h2>
      <h2>Passing Score: 100 %</h2>
  </div>
  `
})

export class PassResultComponent {
  constructor(){}
}
