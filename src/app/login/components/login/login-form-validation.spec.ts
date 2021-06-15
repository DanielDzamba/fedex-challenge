import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from '../../../core/services/loader.service';
import { LoginService } from '../../../core/services/login.service';
import { LoginRoutingModule } from '../../login-routing.module';
import { LoginComponent } from './login.component';

describe('Signup Form Validation', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        LoginRoutingModule,
      ],
      providers: [LoginService, LoaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('first name field validity + signUp button disabling', () => {
    const firstNameControl = component.signUpForm.controls.firstName;
    expect(firstNameControl.valid).toBeFalsy();

    firstNameControl.setValue('');
    expect(firstNameControl.hasError('required')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('last name field validity + signUp button disabling', () => {
    const lastNameControl = component.signUpForm.controls.lastName;
    expect(lastNameControl.valid).toBeFalsy();

    lastNameControl.setValue('');
    expect(lastNameControl.hasError('required')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('email field validity - required + signUp button disabling', () => {
    const emailControl = component.signUpForm.controls.email;
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('email field validity - invalid email format missing @ + signUp button disabling', () => {
    const emailControl = component.signUpForm.controls.email;
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('janko');
    expect(emailControl.hasError('email')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('email field validity - invalid email format missing text after dot + signUp button disabling', () => {
    const emailControl = component.signUpForm.controls.email;
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('d@m.');
    expect(emailControl.hasError('email')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('password field validity - required + signUp button disabling', () => {
    const passwordControl = component.signUpForm.controls.password;
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('password field validity - minlength + signUp button disabling', () => {
    const passwordControl = component.signUpForm.controls.password;
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('j');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('password field validity - hasCapitalCase + signUp button disabling', () => {
    const passwordControl = component.signUpForm.controls.password;
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('j');
    expect(passwordControl?.hasError('hasCapitalCase')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('password field validity - hasSmallCase + signUp button disabling', () => {
    const passwordControl = component.signUpForm.controls.password;
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('J');
    expect(passwordControl?.hasError('hasSmallCase')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });

  it('overall form validity + signUp button disabling', () => {
    const lastNameControl = component.signUpForm.controls.lastName;
    const firstNameControl = component.signUpForm.controls.firstName;
    const passwordControl = component.signUpForm.controls.password;
    const signUpForm = component.signUpForm;

    passwordControl?.setValue('JK');
    lastNameControl.setValue('J');
    firstNameControl.setValue('K');
    expect(signUpForm.hasError('hasLastName')).toBeTruthy();
    expect(signUpForm.hasError('hasFirstName')).toBeTruthy();

    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTruthy();
  });
});
