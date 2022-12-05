import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  opened = true;
  constructor(private breakPointObserver: BreakpointObserver) { 
    breakPointObserver.observe([Breakpoints.Handset]).subscribe(result=>{
      if(result.matches){
        this.opened = false;
      }else{
        this.opened = true;
      }
    })
  }
  
  ngOnInit() {
  }

  drawerToggle() {
    this.opened = !this.opened;
  }

}
