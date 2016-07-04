import {Component} from "@angular/core";
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: "build/pages/quizResult/quizResult.html"
})
export class quizResultComponent {
  passingMarks;
  constructor(private params: NavParams) {
    this.passingMarks = this.params.get("quizId");
   }
}
