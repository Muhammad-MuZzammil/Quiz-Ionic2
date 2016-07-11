import { Control, ControlGroup} from "@angular/common";

interface ValidationResult {
  [key: string]: boolean;
}

export class CustomValidators {
  static isStartWithNumber(control: Control): ValidationResult {
  if (control.value !== "" && !isNaN(control.value.charAt(0))) {
     return  { "isStartWithNumber" : true };
  }
  return null;
}

static EmailValidation(control: Control): ValidationResult {
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (control.value !== "" && !control.value.match(pattern)) {
      return { "EmailValidation" :  true };
    }
    return null;
  }
}
