import {Component, EventEmitter} from "@angular/core";
import {QuestionSetCheckboxComponent} from "./questionSetCheckbox.componet"
import {QuestionSetRadioComponent} from "./questionSetRadio.componet";

@Component({
    selector: "question-set-type",
    template: `
  <div *ngFor="let question of questionSet.questiones; let questionIndex = index" >
          <question-set-radio-type [question]="question" [questionIndex]="questionIndex" (radioOption)="savequestion($event)"></question-set-radio-type>
          <question-set-checkbox-type [question]="question" [questionIndex]="questionIndex" (checkboxOption)="savequestion($event)"></question-set-checkbox-type>
      </div>
      <ion-buttons end>
          <button (click)="nextQuestion()" item-right seagreen *ngIf="!isLastQuestion" [disabled]="!QuestionSetOption">Next</button>

          <button (click)="nextQuestion()" item-right seagreen *ngIf="isLastQuestion" [disabled]="!QuestionSetOption">Save</button>
      </ion-buttons>
  `,
    directives:[QuestionSetCheckboxComponent,QuestionSetRadioComponent],
    inputs: ["questionSet", "isLastQuestion", "duration"],
    outputs: ["questionSetSelectedOption", "questionSetCheckboxSelectedOption"]
})
export class QuestionSetSelectedOption {
    questionSetCheckboxSelectedOption: EventEmitter<Object> = new EventEmitter();
    CheckboxOptionArray: any[] = [];
    questionCheckbox;
    questionSet;
    duration;
    questionSetOptions = [];
    radioQuestionDetail = {};
    QuizQuestionSet;
    checkboxOptionDetail;
    QuestionSetOption: boolean = false;
    RadioIndex: number = null;
    // save questionset option in local array;
    savequestion(selectedOption) {
        console.log(selectedOption)
        if(selectedOption.radioButtonIndex) {
        this.RadioIndex = selectedOption.radioButtonIndex;
        console.log(this.RadioIndex)
        }
        if (selectedOption.checked) {
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: selectedOption.checkboxOptionIndex,
                questionIndex: selectedOption.questionIndex
            });
            this.QuestionSetOption = true
        } else {
            this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
               checkboxOriginalIndex: selectedOption.checkboxOptionIndex,
                questionIndex: selectedOption.questionIndex
            }), 1);

            if (this.CheckboxOptionArray.length == 0) { }

        }
    }

    nextQuestion() {
        this.QuizQuestionSet = [];
        this.questionSet.questiones.forEach((questionSet, i) => {
            // if question set question type == 1
            if (questionSet.type === 1) {
                alert("")
                var questionSetRadioButtonOptionIndex = this.RadioIndex;
                console.log(this.RadioIndex)
                var questionSetRadioButtonOptionRandomIndex = questionSet.options.length - (questionSetRadioButtonOptionIndex + 1);
                //make question Radio Button Object
                var questionRadioButton = {
                    timer: this.duration,
                    type: questionSet.type,
                    optionOriginalIndex: questionSetRadioButtonOptionIndex,
                    optionRandomIndex: questionSetRadioButtonOptionRandomIndex
                }
                // push question Radio Button Object
                this.QuizQuestionSet.push(questionRadioButton);
            }
            //make question checkbox Object

            else if (questionSet.type === 2) {
                var checkboxOptionIndex = [];
                this.CheckboxOptionArray.forEach((checkboxIndex) => {
                    var CheckboxOptionRandomIndex = questionSet.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                    checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
                })

                var questionCheckbox = {
                    timer: this.duration,
                    html: questionSet.html,
                    type: questionSet.type,
                    optionOriginalIndex: this.CheckboxOptionArray,
                    optionRandomIndex: checkboxOptionIndex
                }
                //push question checkbox Object

                this.QuizQuestionSet.push(questionCheckbox);
            }
        })
        console.log(this.QuizQuestionSet, "this.QuizQuestionSet");
        this.questionSetCheckboxSelectedOption.emit(this.QuizQuestionSet);
    }
    // savequestion(option, checked, type, index,questionIndex) {
    //     if (checked) {
    //         this.CheckboxOptionArray.push({
    //             checkboxOriginalIndex: index,
    //             questionSetIndex: questionIndex
    //         });
    //     } else if (type === 1 && index === 0 || index) {
    //         this.radioQuestionDetail = {};
    //         var radioButtonOptionIndex = parseInt(index);
    //         var radioButtonOptionRandomIndex = this.questionSet["questiones"][0].options.length - (radioButtonOptionIndex + 1);
    //         this.radioQuestionDetail = {
    //             type: 1,
    //             optionOriginalIndex: radioButtonOptionIndex,
    //             optionRandomIndex: radioButtonOptionRandomIndex
    //         };
    //     }
    //     else {
    //         this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
    //               checkboxOriginalIndex: index,
    //               questionSetIndex: questionIndex
    //         }), 1);
    //     }
    //     console.log(this.CheckboxOptionArray)
    // }    // save checkbox question option in local array;

    // savequestion(option, checked, type, index) {
    //   console.log(option, checked, type, index)
    //     if (checked) {
    //         this.CheckboxOptionArray.push({
    //             checkboxOriginalIndex: index
    //       });
    //         var checkboxOptionIndex = [];
    //         this.CheckboxOptionArray.forEach((checkboxIndex) => {
    //             var CheckboxOptionRandomIndex = this.questionSet["questiones"][0].options.length - (checkboxIndex.checkboxOriginalIndex + 1);
    //             checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
    //         })
    //
    //         var checkboxOptionDetail = {
    //             type: 2,
    //             optionOriginalIndex: this.CheckboxOptionArray,
    //             optionRandomIndex: checkboxOptionIndex
    //         }
    //
    //         this.questionSetOptions.push(checkboxOptionDetail);
    //         console.log(this.questionSetOptions,"questionSetOptions");
    //         // this.questionSetCheckboxSelectedOption.emit(checkboxOptionDetail);
    //     }
    //     else if(type === 1 && index === 0 || index) {
    //         // console.log(this.questionRadio, "questionRadio.options");
    //         this.radioQuestionDetail = {};
    //
    //         var radioButtonOptionIndex = parseInt(index);
    //         var radioButtonOptionRandomIndex = this.questionSet["questiones"][0].options.length - (radioButtonOptionIndex + 1);
    //
    //         this.radioQuestionDetail = {
    //           type: 1,
    //           optionOriginalIndex: radioButtonOptionIndex,
    //           optionRandomIndex: radioButtonOptionRandomIndex
    //         };
    //
    //         console.log(this.questionSetOptions,"questionSetOptions");
    //         // this.questionSetCheckboxSelectedOption.emit(radioQuestionDetail);
    //     } else {
    //         this.questionSetOptions.forEach((checkboxOption) => {
    //           console.log(checkboxOption)
    //         })
    //         this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
    //             checkboxOriginalIndex: index
    //         }), 1);
    //         if (this.CheckboxOptionArray.length == 0) {
    //             this.questionSetCheckboxSelectedOption.emit(null);
    //         }
    //     }
    // }
}
