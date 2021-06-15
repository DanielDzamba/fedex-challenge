import { AbstractControl, FormGroup } from '@angular/forms';

export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export type UserControls = { [key in keyof User]: AbstractControl };
export type UserFormGroup = FormGroup & { value: User; controls: UserControls };
