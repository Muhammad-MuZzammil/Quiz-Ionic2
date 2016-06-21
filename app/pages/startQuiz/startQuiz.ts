
import {NavController,NavParams} from 'ionic-angular';
import {Component,OnInit} from '@angular/core';
import {GetGroupQuizSchedule} from "../home/GetGroupQuizSchedule";

@Component({
    templateUrl: 'build/pages/startQuiz/startQuiz.html'

})
export class startQuiz implements OnInit {

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
    QuizId;
    QuizParams;
    constructor(public _navController: NavController,public params: NavParams,private QuizSchedule: GetGroupQuizSchedule) { }

    ngOnInit() {
        this.QuizParams = this.params.get('quizshow');

        this.QuizParams = this.QuizSchedule.getQuizId(this.QuizParams);

        firebase.database().ref('quiz-in-progress').child(this.QuizParams).on("value", (quizData)=> {
            console.log(quizData.val()["questionbanks"])
            for (var book in quizData.val()["questionbanks"]) {
                              console.log(book)
                              for (var chapter in quizData.val()["questionbanks"][book].chapters) {
                                  for (var topic in quizData.val()["questionbanks"][book].chapters[chapter].topics) {
                                      for (var question in quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions) {
                                          this.questionKeyArray.push(question);
                                          this.questionArr.push(quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions[question]);
                                      } // for in loop questions end
                                  } // for in loop Topics end
                              } // for in loop chapters end
                          } // for in loop on Book end
            this.question = this.questionArr[this.index];
        })
    }// ngOnInit function end

    // save checkbox question option in local array;
     savequestion(option,checked) {
         if(checked){
             this.CheckboxOptionArray.push({
                 html: option
             });

         }else {

             this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
                 html: option
             }),1);
         }
     }    // save checkbox question option in local array;
     //nextQuestion show next question after liking on next button
     nextQuestion(optionRadioButton,question,QuestionSetOptionRadioButton) {
         var questionIndex = this.questionArr.indexOf(question); // find index of question index
        var questionKey = this.questionKeyArray[questionIndex] // get data of question by giving index
        // push data in Quiz Array if question type is == 1
        var radioOption = {
            html : optionRadioButton
        }
         if(question.type === 1) {
             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 option: radioOption,
                 questionKey: questionKey
             })
         }// if statement end
         // push data in Quiz Array else if question type is == 2

         else if(question.type === 2){
             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 option: this.CheckboxOptionArray,
                 questionKey: questionKey
             })
         }//else if statement end

         else  {
             // push data in Quiz Array else question type is == 3
             this.QuizQuestionSet = [];
             question.questiones.forEach((questionSet,i) =>{
                 // if question set question type == 1
                 if(questionSet.type === 1){
                     var questionSetRadioButtonOption = {
                         html: QuestionSetOptionRadioButton
                     }
                     //make question Radio Button Object
                    var questionRadioButton =  {
                          html: questionSet.html,
                          type: questionSet.type,
                          option: questionSetRadioButtonOption,
                      }
                      // push question Radio Button Object
                      this.QuizQuestionSet.push(questionRadioButton);
                 }
                  //make question checkbox Object

                 else if(questionSet.type === 2) {
                    var questionCheckbox =  {
                          html: questionSet.html,
                          type: questionSet.type,
                          option: this.CheckboxOptionArray,
                      }
                        //push question checkbox Object

                 this.QuizQuestionSet.push(questionCheckbox);

                 }
             })
             // push data in Quiz Array else question type is == 3

             this.Quiz.push({
                 html: question.html,
                 type: question.type,
                 questiones: this.QuizQuestionSet,
                 questionKey: questionKey
             })
         } // else question type is == 3 end
         // empty CheckboxOptionArray after push data in quiz
         this.CheckboxOptionArray = [];
         this.index++;

         // check if this.questionArr.length is greater than index if greater than assign next question in this.question Object
         if(this.questionArr.length > this.index) {
             this.question = this.questionArr[this.index];

         }
          // check if this.questionArr.length is  equal to index if equal to then show save button
         if ((this.questionArr.length - 1)  == this.index) {
             this.lastQuestion = true;
         }
         if(this.questionArr.length - 1  < this.index) {
             this.saveQuizToFirebase(this.Quiz)
         }

     }//nextQuestion show next question after liking on next button
     // save Quiz To firebase funtion start
     saveQuizToFirebase(quiz) {
        //  var ref = new Firebase("https://luminous-torch-4640.firebaseio.com/");

         var multipathObject = {};
         var userId = "abcs";
         var groupId = "groupquiz";
         var subgroupId = "quisubgroup";
         var quizId = "quiz01";
         // if Quiz
         if(quiz) {
             quiz.forEach(function(question) {
                 // check if question.type == 1
                 if(question.type == 1) {
                     // make object of quiz question radio button object
                     multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/options/" + 0 + "/"] = question.option;
                 }
                // check if question.type == 2
                 if(question.type == 2) {
                     // make object of quiz question checkbox object
                     multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/options"] = question.option;
                 }
                 // check if question.type == 3
                 if(question.type == 3) {
                      question.questiones.forEach((questionSet,index)=> {

                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/html" ] = questionSet.html;

                        if(questionSet.type === 1) {
                            // make object of quiz questionSet radio button object
                            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/options/" + 0 + "/"] = questionSet.option;

                        }
                        else {
                            // make object of quiz questionSet radio button object
                            questionSet.option.forEach((questionSetOption,optionIndex) =>{
                                multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/options/" + optionIndex + "/html"] = questionSetOption.html;

                            })
                        } // else statement in if(question.type === 3) end

                    });//question questiones forEach end

                 }// if statement type == 3 end

             }) // quiz.forEach end
             firebase.database().ref().update(multipathObject, function(error) {
                 if(error) {
                     console.log(error)
                 }
                 else {
                     alert("Quiz Submit")
                 }
             })

         }//if statement end
     }// save Quiz To firebase funtion end

}
