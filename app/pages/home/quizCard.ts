import {Component, EventEmitter} from "@angular/core";
import {CalendarPipe} from 'angular2-moment';
@Component({
  selector: "quiz-card",
  pipes: [CalendarPipe],
  template: `
      <ion-card class="height80px" *ngFor="let quiz of quizData; let i = index">
          <ion-card-content>
              <b>{{quiz.quizTitle}}</b>
              <ion-buttons right>
                  <button clear class="backgroundColor" *ngIf="quiz.scheduleIsStarted" (click)="checkIsQuizCanGiven(quiz,i)">Go to Quiz</button>
              </ion-buttons>
          </ion-card-content>
      </ion-card>
  `,
  inputs: ["quizData"],
  outputs: ["checkQuiz"]
})
export class QuizCardHtml {
  checkQuiz: EventEmitter<Object> = new EventEmitter();
  constructor() {}
  checkIsQuizCanGiven(quiz,index) {
    var quizinfo = {
      quiz: quiz,
      index: index
    }
    this.checkQuiz.emit(quizinfo);
  }
}
