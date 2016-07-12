import {Component,EventEmitter} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {CustomValidators} from "./customValidation";
import {Login} from "./login"
@Component({
  selector: "login-form",
  template:`
  <form [ngFormModel]="authForm" (ngSubmit)="login()" novalidate>
      <ion-item>
          <ion-label floating>Email</ion-label>
          <ion-input type="email" [ngFormControl]="email" required value="a4arshi@yahoo.com"></ion-input>
      </ion-item>
      <span class="text-error" *ngIf="email.dirty && !email.valid" padding>
          <span *ngIf="email.errors.EmailValidation">* Email Address is not Valid</span>
      </span>
      <ion-item [class.error]="!password.valid && password.touched">
          <ion-label floating>Password</ion-label>
          <ion-input type="password" value="" [ngFormControl]="password" value="123"></ion-input>
      </ion-item>
      <span class="text-error" *ngIf="password.dirty && !password.valid" padding>
          password is required
      </span>
      <br/><br/>
      <button type="submit" [disabled]="!authForm.valid" full seagreen>Submit</button>
  </form>
  `,
  directives: [FORM_DIRECTIVES],
  outputs: ["LoginData"]
})

export class LoginFormComponent {
  email: AbstractControl;
  password: AbstractControl;
  authForm: ControlGroup;

  LoginData: EventEmitter<Object> = new EventEmitter();
  constructor(private form: FormBuilder) {
    this.authForm = form.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.EmailValidation])],
          'password': ['', Validators.compose([Validators.required])]
      });

      this.email = this.authForm.controls['email'];
      this.password = this.authForm.controls['password'];
  }
  login() {
    if (this.authForm.valid) {
      this.LoginData.emit(this.authForm.value);
    }
  }
}
