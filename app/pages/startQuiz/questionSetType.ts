import {Component, EventEmitter} from "@angular/core";
import {QuestionSetCheckboxComponent} from "./questionSetCheckbox.componet"
import {QuestionSetRadioComponent} from "./questionSetRadio.componet";

@Component({
    selector: "question-set-type",
    template: `
  <div *ngFor="let question of questionSet.questiones; let questionIndex = index" >
          <question-set-radio-type [question]="question" 
                                   [questionIndex]="questionIndex" (radioOption)="savequestion($event)">
           </question-set-radio-type>
          <question-set-checkbox-type [question]="question" 
                                   [questionIndex]="questionIndex" (checkboxOption)="savequestion($event)">
          </question-set-checkbox-type>
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
    submitted:  boolean;
    // push checkbox option in CheckboxOptionArray when checked
    savequestion(selectedOption) {
        if(this.submitted) {
            this.CheckboxOptionArray = [];
            this.submitted = false;
        }
        // when radio Option index
        if(selectedOption.radioButtonIndex == 0 || selectedOption.radioButtonIndex) {
        this.RadioIndex = selectedOption.radioButtonIndex;
         this.QuestionSetOption = true
         return ;
        }
        if (selectedOption.checked) {
            // push checkbox Option Index when checked
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: selectedOption.checkboxOptionIndex,
                questionIndex: selectedOption.questionIndex
            });
            this.QuestionSetOption = true
        } else {
        
            //splice checkboxOption Index when unchecked
            this.CheckboxOptionArray.splice(selectedOption.checkboxOptionIndex,1);
            if (this.CheckboxOptionArray.length == 0) { }
        }
    }
 // save radio Option and checkbox option in question set Array then emit outputs event
    nextQuestion() {
        this.QuizQuestionSet = [];
        this.questionSet.questiones.forEach((questionSet, i) => {
            // if question set question type == 1
            if (questionSet.type === 1) {
                var questionSetRadioButtonOptionIndex = this.RadioIndex;
                var questionSetRadioButtonOptionRandomIndex = questionSet.options.length - (questionSetRadioButtonOptionIndex + 1);
                //make question Radio Button Object
                var questionRadioButton = {
                    timer: this.duration,
                    type: questionSet.type,
                    optionOriginalIndex: questionSetRadioButtonOptionIndex
                }
                // push question Radio Button Object
                this.QuizQuestionSet.push(questionRadioButton);
            }
            //make question checkbox Object

            else if (questionSet.type === 2) {
                var checkboxOptionIndex = [];
                // make Checkbox Option Random Index Array
                this.CheckboxOptionArray.forEach((checkboxIndex) => {
                    var CheckboxOptionRandomIndex = questionSet.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                    checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
                })

                //make question checkbox Object
                var questionCheckbox = {
                    timer: this.duration,
                    html: questionSet.html,
                    type: questionSet.type,
                    optionOriginalIndex: this.CheckboxOptionArray
                }
                //push question checkbox Object
                this.QuizQuestionSet.push(questionCheckbox);
            }
        })
        let questionSetObject =  {
                timer: this.duration,
                html: this.questionSet.html,
                type: this.questionSet.type,
                questiones: this.QuizQuestionSet,
                questionKey: this.questionSet.questionKey,
                bookId: this.questionSet.bookId,
                chapterId: this.questionSet.chapterId,
                topicId: this.questionSet.topicId
            }
        // emit outputs event
        this.submitted = true;
        this.questionSetCheckboxSelectedOption.emit(questionSetObject);
    }// nextquestion function  end
}
