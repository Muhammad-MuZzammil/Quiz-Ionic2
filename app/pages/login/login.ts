import {AbstractControl} from '@angular/common';
export class Login {
  constructor(public email: AbstractControl,public password: AbstractControl) {
  }
}
