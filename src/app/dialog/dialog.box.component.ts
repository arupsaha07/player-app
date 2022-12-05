import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog.component.css']
  })
  export class DialogBoxComponent {
  
    private error: boolean = false;
    private showCancelButton: boolean = false;
    private showYesNoButton: boolean = false;
    private message:string='';
    private title:string='';
    private return: any={return:'send back any data to calling component here'};
  
    constructor(
      public dialogRef: MatDialogRef<DialogBoxComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.error) {
        this.error = true;
      }
      if (data.showCancelButton) {
        this.showCancelButton = true;
      }
      if(data.message){
        this.message = data.message;
      }
      if(data.title){
        this.title= data.title;
      }
      if(data.showYesNoButton){
        this.showYesNoButton = true;
      }
    }

    onCancel(): void {
      this.dialogRef.close();
    }
  
  }