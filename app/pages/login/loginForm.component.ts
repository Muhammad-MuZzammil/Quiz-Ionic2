import {Component, EventEmitter} from "@angular/core";
// import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {CustomValidators} from "./customValidation";
import {Login} from "./login"
@Component({
    selector: "login-form",
    template: `
  <form #authForm="ngForm" (ngSubmit)="login(authForm)" novalidate>
      <ion-item>
          <ion-label floating>Email</ion-label>
          <ion-input type="email" [(ngModel)]="user.email" required name="email" #email="ngModel"></ion-input>
      </ion-item>
      <span class="text-error" *ngIf="email.dirty && !email.valid" padding>
          <span >* Email Address is not Valid</span>
      </span>
      <span class="text-error"  padding>
          <span>{{Error | json}}</span>
      </span>
      <ion-item [class.error]="!password.valid && password.touched">
          <ion-label floating>Password</ion-label>
          <ion-input type="password" required [(ngModel)]="user.password" name="password" #password="ngModel" ></ion-input>
      </ion-item>
      <span class="text-error" *ngIf="password.dirty && !password.valid" padding>
          password is required
      </span>
      <br/><br/>
      <button type="submit" [disabled]="!authForm.valid" full seagreen>Submit</button>
  </form>
  `,
    directives: [],
    outputs: ["LoginData"],
    inputs: ["Error"]
})

export class LoginFormComponent {
    email;
    password;
    authForm;
    user = { email: "", password: "" }
    LoginData: EventEmitter<Object> = new EventEmitter();
    constructor() { }
    login(authForm) {
        if (authForm.valid) {
            let UserCredentials = new Login(authForm.value.email, authForm.value.password);
            this.LoginData.emit(UserCredentials);
        } else {
            console.log("----------------------------------------")
        }
    }
}
