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
  `,
    inputs: ["questionCheckbox"],
    outputs: ["CheckboxSelectedOption"]
})
export class QuestionCheckboxTypeComponent {
    CheckboxSelectedOption: EventEmitter<Object> = new EventEmitter();
    CheckboxOptionArray: any[] = [];
    questionCheckbox;
    constructor() { }
    // save checkbox question option in local array;
    savequestion(option, checked, type, index) {
        if (checked) {
            this.CheckboxOptionArray.push({
                checkboxOriginalIndex: index
            });
            console.log(this.CheckboxOptionArray, "this.CheckboxOptionArray")
            var checkboxOptionIndex = [];
            this.CheckboxOptionArray.forEach((checkboxIndex) => {
                var CheckboxOptionRandomIndex = this.questionCheckbox.options.length - (checkboxIndex.checkboxOriginalIndex + 1);
                checkboxOptionIndex.push({ CheckboxOptionRandomIndex: CheckboxOptionRandomIndex })
            })

            var checkboxOptionDetail = {
                type: 2,
                optionOriginalIndex: this.CheckboxOptionArray,
                optionRandomIndex: checkboxOptionIndex,
            }
            this.CheckboxSelectedOption.emit(checkboxOptionDetail)

        } else {
            this.CheckboxOptionArray.splice(this.CheckboxOptionArray.indexOf({
                checkboxOriginalIndex: index
            }), 1);
            if (this.CheckboxOptionArray.length == 0) {
                this.CheckboxSelectedOption.emit(null)
            }

        }
    }
}    // save checkbox question option in local array;
