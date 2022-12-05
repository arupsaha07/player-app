import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppConfig } from '../../config/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleDrawer = new EventEmitter();
  appName: string;
  fullName: string;
  opened:boolean = true;
  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe((result)=>{
      if(result.matches){
        this.opened = false;
      }else{
        this.opened = true;
      }
    })
   }

  ngOnInit() {
    this.appName = AppConfig.AppName;
    let user: any = JSON.parse(localStorage.getItem("currentUser"));
    if(user){
      this.fullName = user[0].firstName + ' ' + user[0].lastName;
    }else{
      this.fullName = "Developer User";
    }
    
  }

  drawerToggle() {
    this.toggleDrawer.emit();
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }

}
