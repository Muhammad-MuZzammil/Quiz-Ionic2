import {Page, NavController} from 'ionic-angular';
// import {AngularFire} from 'angularfire2';
// import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";




@Page({
    templateUrl: 'build/pages/startQuiz/startQuiz.html',
    directives: [RADIO_GROUP_DIRECTIVES]
})
export class startQuiz implements OnInit {

    data: FirebaseListObservable<any[]>;
    questionArr: any[] = [];
    CheckboxOptionArray: any[] = [];
    questionKeyArray: any[] = [];
    index: number = 0;
    question: any;
    lastQuestion: boolean = false;
    correct: Boolean;
    answer: String;
    Quiz: any[] = [];
    QuizQuestionSet: any[] = [];
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
                                        this.questionKeyArray.push(question);
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
     savequestion(option,checked) {
         console.log(this.CheckboxOptionArray)
         if(checked){
             this.CheckboxOptionArray.push(option);
             console.log(option,checked)

         }else {
             console.log("unchecked")
             this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf(option),1);

         }
         console.log(this.CheckboxOptionArray);
     }
     nextQuestion(optionRadioButton,question,QuestionSetOptionRadioButton) {
         var questionIndex = this.questionArr.indexOf(question);
        var questionKey = this.questionKeyArray[questionIndex]
         if(question.type === 1) {
             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 option: optionRadioButton,
                 questionKey: questionKey
             })
         }
         else if(question.type === 2){
             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 option: this.CheckboxOptionArray,
                 questionKey: questionKey
             })
         }
         else  {
            //  var val = questionSet.value
             this.QuizQuestionSet = []
             question.questiones.forEach((questionSet,i) =>{
                 if(questionSet.type === 1){
                    var questionRadioButton =  {
                          html: questionSet.html,
                          type: questionSet.type,
                          option: QuestionSetOptionRadioButton,
                      }
                      this.QuizQuestionSet.push(questionRadioButton);
                 }
                 else if(questionSet.type === 2) {
                    var questionCheckbox =  {
                          html: questionSet.html,
                          type: questionSet.type,
                          option: this.CheckboxOptionArray,
                      }
                 this.QuizQuestionSet.push(questionCheckbox);

                 }
             })

             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 questiones: this.QuizQuestionSet,
                 questionKey: questionKey
             })
         }
         this.CheckboxOptionArray = [];
         this.index++;

         if(this.questionArr.length > this.index) {
             this.question = this.questionArr[this.index];

         }
         if ((this.questionArr.length - 1)  == this.index) {
             this.lastQuestion = true;

         }


     }

}
