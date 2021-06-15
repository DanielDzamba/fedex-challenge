import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../../entity/user/user';

export class CustomFormValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      return regex.test(control.value) ? null : error;
    };
  }

  static passwordContainingFirstName = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const user = control.value as User;

    return user.password?.includes(user.firstName)
      ? { hasFirstName: true }
      : null;
  };

  static passwordContainingLastName = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const user = control.value as User;

    return user.password?.includes(user.lastName)
      ? { hasLastName: true }
      : null;
  };
}
