import { Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { isNumber } from "util";

export const validationMessages = {
  required: 'Este campo es necesario.',
  minLength: 'El campo es muy corto.',
  maxLength: 'El campo es muy largo.',
  email: 'Email invalido.',
  number: 'Este campo debe ser numérico.'
};

export function trimField(control: AbstractControl): ValidationErrors | null {
  const value = !!control.value ? control.value : '';
  return !!value.toString().trim() ? null : { trim: true };
}

export function withArray(array: any[]) {
  return (control: AbstractControl) => {
    return array.length > 0 ? null : {isEmpty: true};
  };
}

export function positiveNumber(control: AbstractControl): ValidationErrors | null {
  const value = !!control.value ? control.value : '';
  return !!value.toString().trim() && (Number(value) >= 0) ? null : { positiveNumber : true };
}

export function validateDataToEqual(firstObject: any) {
  return (control: AbstractControl) => {
    let isEqual = true;
    const secondObject = control.value;
    Object.keys(firstObject).map((key) => {
      if (firstObject[key] !== secondObject[key] && !!isEqual) {
        isEqual = false;
      }
    });
    Object.keys(secondObject).map((key) => {
      if (firstObject[key] !== secondObject[key] && !!isEqual) {
        isEqual = false;
      }
    });
    return !isEqual ? null : { notChange: true };
  }
}