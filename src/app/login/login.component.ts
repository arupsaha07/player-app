import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { AuthenticateService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appName: string;
  loginForm: FormGroup;
  showSpinner:boolean = false;
  showMessage:string;
  constructor(
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.appName = AppConfig.AppName;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });
  }

  getUsernameError() {
    return this.loginForm.controls.username.hasError('required') ? 'You must enter a value' :
      this.loginForm.controls.username.hasError('minlength') ? 'Username must not be less than 3 characters' :
        '';
  }
  getPasswordError() {
    return this.loginForm.controls.password.hasError('required') ? 'You must enter a value' : '';
  }

  userLogin() {
    this.showSpinner = true;
    let userName = this.loginForm.value.username;
    let pwd = this.loginForm.value.password;
    this.authService.login(userName, pwd).subscribe((user: any) => {
      this.showSpinner = false;
      if (user.length) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.router.navigate(["/dashboard"]);
      }else{
        this.showMessage = "Invalid Username or password";
      }
    })
  }
}

