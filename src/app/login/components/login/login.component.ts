import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login.service';
import { UserControls, UserFormGroup } from '../../../entity/user/user';
import { UserAdapter } from '../../../entity/user/user-adapter';
import { CustomFormValidators } from '../../validators/custom-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  signUpForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomFormValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        CustomFormValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]),
    } as UserControls,
    {
      validators: [
        CustomFormValidators.passwordContainingFirstName,
        CustomFormValidators.passwordContainingLastName,
      ],
    }
  ) as UserFormGroup;

  constructor(private loginService: LoginService) {
    this.signUpForm.valueChanges.subscribe(() => console.log(this.signUpForm));
  }

  submitLoginForm() {
    this.loginService
      .signUp(UserAdapter.userToUserCreateDto(this.signUpForm.value))
      .subscribe();
  }
}
