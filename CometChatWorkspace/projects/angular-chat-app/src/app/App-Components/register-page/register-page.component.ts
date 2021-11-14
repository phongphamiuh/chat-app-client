import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { AuthenticationService } from '../../Services/authen-service/authentication.service';
import ConfirmPasswordValidation from '../../Validation/ConfirmPasswordValidation'
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  registerForm : FormGroup
  isValidFormSubmitted = null;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [ConfirmPasswordValidation.match('password','confirmPassword')]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSignUp() {
    var email = this.registerForm.get('email').value
    var name = this.registerForm.get('name').value
    var password = this.registerForm.get('password').value  
    var phone = this.registerForm.get('phone').value  
    this.isValidFormSubmitted = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.authService.sighUp(email,password,name,phone)
  } 
  
}
