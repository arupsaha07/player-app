import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file404',
  templateUrl: './file404.component.html',
  styleUrls: ['./file404.component.css']
})
export class File404Component implements OnInit {

  appName: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.appName = AppConfig.AppName;
  }

  home(){
    this.router.navigate(["/dashboard"]);
  }
}
