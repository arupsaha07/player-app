import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../config/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  appName: string;
  createdBy:string;
  constructor() { }

  ngOnInit() {
    this.appName = AppConfig.AppName;
    this.createdBy = AppConfig.CreatedBy;
  }

}
