import {Component, EventEmitter} from "@angular/core";
interface ICheckBoxType {
    timer: number,
    questionKey: string,
    bookId: string,
    chapterId: string,
    topicId: string,
    type: number,
    optionOriginalIndex: Array<any>
}
@Component({
    selector: "checkbox-type",
    template: `
  <h2 text-center>Options</h2>
  <ion-list padding text-wrap>
        <ion-item *ngFor="let option of questionCheckbox.options; let i = index" >
            <ion-checkbox (ionChange)="savequestion(option.text,checkbox.checked,null,i)" #checkbox [checked]=false></ion-checkbox>
            <ion-label [innerHTML]="option.text"></ion-label>

        </ion-item>
    </ion-list>
    <ion-buttons end>
        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="!isLastQuestion" [disabled]="!checkboxOption">Next</button>

        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="isLastQuestion" [disabled]="!checkboxOption">Save</button>
    </ion-buttons>
  `,
    inputs: ["questionCheckbox", "isLastQuestion", "remainingTime"],
    outputs: ["CheckboxSelectedOption"]
})
export class QuestionCheckboxTypeComponent {
    CheckboxSelectedOption: EventEmitter<Object> = new EventEmitter();
    CheckboxOptionArray: any[] = [];
    questionCheckbox;
    checkboxOption: boolean = false
    checkboxOptionDetail: ICheckBoxType;
    submited: boolean;
    remainingTime: number;

    // save checkbox question option in local array;
    savequestion(option, checked, type, index) {
        if (this.submited) {
            this.CheckboxOptionArray = [];
            this.submited = false;
        }
        if (checked) {
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: index
            });

            var checkboxOptionIndex = [];
            this.CheckboxOptionArray.forEach((checkboxIndex) => {
                var CheckboxOptionRandomIndex = this.questionCheckbox.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
            })
            this.checkboxOptionDetail = {
                timer: this.remainingTime,
                questionKey: this.questionCheckbox.questionKey,
                bookId: this.questionCheckbox.bookId,
                chapterId: this.questionCheckbox.chapterId,
                topicId: this.questionCheckbox.topicId,
                type: 2,
                optionOriginalIndex: this.CheckboxOptionArray,
            }
            this.checkboxOption = true;
        } else {
            this.CheckboxOptionArray.forEach((checkboxSelectedOption, i) => {
                if (checkboxSelectedOption.checkboxOriginalIndex === index) {
                    this.CheckboxOptionArray.splice(i , 1);
                }
            })


            if (this.CheckboxOptionArray.length == 0) {
                this.CheckboxSelectedOption.emit(null)
                this.checkboxOption = false
            }

        }
    }// save checkbox question option in local array;
    nextQuestion(question) {
        this.submited = true;
         this.checkboxOption = false;
        this.CheckboxSelectedOption.emit(this.checkboxOptionDetail);
    }
}    
