import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../config/app.config';
import { UserService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  appName: string;
  showSpinner: boolean = false;
  showMessage:string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.appName = AppConfig.AppName;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getUsernameError() {
    return this.registerForm.controls.username.hasError('required') ? 'You must enter a value' :
      this.registerForm.controls.username.hasError('minlength') ? 'Username must not be less than 3 characters' : '';
  }
  getPasswordError() {
    return this.registerForm.controls.password.hasError('required') ? 'You must enter a value' : '';
  }

  getfirstnameError() {
    return this.registerForm.controls.firstName.hasError('required') ? 'You must enter a value' :
      this.registerForm.controls.firstName.hasError('minlength') ? 'First name must not be less than 3 characters' : '';
  }

  getlastnameError() {
    return this.registerForm.controls.lastName.hasError('required') ? 'You must enter a value' :
      this.registerForm.controls.lastName.hasError('minlength') ? 'Last name must not be less than 3 characters' : '';
  }
  register() {
    this.showSpinner = true;
    this.userService.saveUser(this.registerForm.value).subscribe((result:any)=>{
      this.showSpinner = false;
      if(result.success){
        this.showMessage = "Successfully Registered";
      }else{
        this.showMessage = "Registration Failed";
      }
    })
  }
}
