import {Component, EventEmitter} from "@angular/core";

@Component({
    selector: "checkbox-type",
    template: `
  <h2 text-center>Options</h2>
  <ion-list padding>
        <ion-item *ngFor="let option of questionCheckbox.options; let i = index">
            <ion-checkbox (ionChange)="savequestion(option.html,checkbox.checked,null,i)" #checkbox [checked]=false></ion-checkbox>
            <ion-label [innerHTML]="option.html"></ion-label>
        </ion-item>
    </ion-list>
    <ion-buttons end>
        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="!isLastQuestion" [disabled]="!checkboxOption">Next</button>

        <button (click)="nextQuestion(question)" item-right seagreen *ngIf="isLastQuestion" [disabled]="!checkboxOption">Save</button>
    </ion-buttons>
  `,
    inputs: ["questionCheckbox","isLastQuestion"],
    outputs: ["CheckboxSelectedOption"]
})
export class QuestionCheckboxTypeComponent {
    CheckboxSelectedOption: EventEmitter<Object> = new EventEmitter();
    CheckboxOptionArray: any[] = [];
    questionCheckbox;
    checkboxOption: boolean = false
    checkboxOptionDetail;

    constructor() { }
    // save checkbox question option in local array;
    savequestion(option, checked, type, index) {
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
                type: 2,
                optionOriginalIndex: this.CheckboxOptionArray,
                optionRandomIndex: checkboxOptionIndex,
            }
           this.checkboxOption = true;
        } else {
            this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
                checkboxOriginalIndex: index
            }), 1);

            if (this.CheckboxOptionArray.length == 0) {
                this.CheckboxSelectedOption.emit(null)
                this.checkboxOption = false
            }

        }
    }// save checkbox question option in local array;
    nextQuestion(question) {
        this.CheckboxSelectedOption.emit(this.checkboxOptionDetail)
    }
}    
