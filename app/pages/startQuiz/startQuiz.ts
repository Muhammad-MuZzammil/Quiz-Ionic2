import {Page, NavController} from 'ionic-angular';
// import {AngularFire} from 'angularfire2';
// import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';





@Page({
    templateUrl: 'build/pages/startQuiz/startQuiz.html'
})
export class startQuiz implements OnInit {

    data: FirebaseListObservable<any[]>;
    questionArr: any[] = [];
    index: number = 0;
    question: any;
    lastQuestion: boolean = false;
    constructor(public nav: NavController, public af: AngularFire) { }
    ngOnInit() {
        this.af.database.list('quiz-in-progress/quiz01/').subscribe((res) => {
            this.questionArr = [];
            console.log(res);
            res.forEach((quizData) => {
            if (quizData.$key === "questionbanks") {
                        for (var book in quizData) {
                            console.log(book)
                            for (var chapter in quizData[book].chapters) {
                                for (var topic in quizData[book].chapters[chapter].topics) {
                                    for (var question in quizData[book].chapters[chapter].topics[topic].questions) {
                                        this.questionArr.push(quizData[book].chapters[chapter].topics[topic].questions[question]);
                                    } // for in loop questions end
                                } // for in loop Topics end
                            } // for in loop chapters end
                        } // for in loop on Book end
                        this.question = this.questionArr[this.index];
                    }// if statement end
              })// this.data For Each loop end
        })
     }
     savequestion() {

     }
     nextQuestion() {
         this.index++;
         console.log(this.questionArr.length -1 , this.index)
         if(this.questionArr.length > this.index) {
             this.question = this.questionArr[this.index];

         }
         if ((this.questionArr.length - 1)  == this.index) {
             this.lastQuestion = true;
         }


     }

}
