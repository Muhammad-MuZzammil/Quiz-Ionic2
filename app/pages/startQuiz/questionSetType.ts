import {Component, EventEmitter} from "@angular/core";

@Component({
    selector: "question-set-type",
    template: `
  <div *ngFor="let question of questionSet.questiones; let questionIndex = index" >
          <ion-list radio-group *ngIf="question.type === 1" [(ngModel)]="QuestionSetOptionRadioButton">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{i + 1}}</b>
                  <div [innerHTML]="question.html"></div>
              </div>
              <ion-item *ngFor="let option of question.options; let radioOptionIndex = index">
                  <ion-radio value="{{radioOptionIndex}}" (click)="savequestion(option.html,null,1,radioOptionIndex,null)"></ion-radio>
                  <ion-label [innerHTML]="option.html" ></ion-label>
              </ion-item>
          </ion-list>
          <ion-list *ngIf="question.type === 2">
              <div style="display: inline-flex;padding-top: 15px;">
                  <b style="margin-right: 10px;padding-top: 13px;">Q:{{questionIndex + 1}}</b>
                  <div [innerHTML]="question.html"></div>
              </div>
              <ion-item *ngFor="let option of question.options; let checkboxOptionIndex = index">
                  <ion-checkbox (ionChange)="savequestion(option.html,checkbox.checked,3,checkboxOptionIndex,questionIndex)" #checkbox [checked]=false></ion-checkbox>
                  <ion-label [innerHTML]="option.html"></ion-label>
              </ion-item>
          </ion-list>
      </div>
  `,
    inputs: ["questionSet","isLastQuestion"],
    outputs: ["questionSetSelectedOption", "questionSetCheckboxSelectedOption"]
})
export class QuestionSetSelectedOption {
    questionSetCheckboxSelectedOption: EventEmitter<Object> = new EventEmitter();
    CheckboxOptionArray: any[] = [];
    questionCheckbox;
    questionSet;
    questionSetOptions = [];
    radioQuestionDetail = {};

    // save questionset option in local array;
    savequestion(option, checked, type, index,questionIndex) {
        if (checked) {
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: index,
                questionSetIndex: questionIndex
            });
        } else if (type === 1 && index === 0 || index) {
            this.radioQuestionDetail = {};
            var radioButtonOptionIndex = parseInt(index);
            var radioButtonOptionRandomIndex = this.questionSet["questiones"][0].options.length - (radioButtonOptionIndex + 1);
            this.radioQuestionDetail = {
                type: 1,
                optionOriginalIndex: radioButtonOptionIndex,
                optionRandomIndex: radioButtonOptionRandomIndex
            };
        }
        else {
            this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
                  checkboxOriginalIndex: index,
                  questionSetIndex: questionIndex
            }), 1);
        }
        console.log(this.CheckboxOptionArray)
    }    // save checkbox question option in local array;

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
