import {Component} from "@angular/core";
import {NavParams} from 'ionic-angular';
import {FailResultComponent} from "./fail.result.component";
import {PassResultComponent} from "./pass.result.component";
@Component({
  templateUrl: "build/pages/quizResult/quizResult.html",
  directives:[FailResultComponent,PassResultComponent]
})
export class quizResultComponent {
  passingMarks;
  constructor(private params: NavParams) {
    this.passingMarks = this.params.get("quizId");
   }
}
