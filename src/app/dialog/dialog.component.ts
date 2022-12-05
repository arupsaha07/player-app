import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from './dialog.box.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { error: false, showCancelButton: false, message: 'Information save successfully.....' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

