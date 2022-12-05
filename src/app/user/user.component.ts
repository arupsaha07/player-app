import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { AppConfig } from '../config';
import { User } from '../model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'status', 'action'];
  selectedUser: User;
  userList: User[];

  private recordsLength = 0;
  private userService: UserService;
  private router: Router;
  private dialog: MatDialog;
  private pageNo: number;

  constructor() {
    this.userService = AppConfig.InjectorInstance.get<UserService>(UserService);
    this.router = AppConfig.InjectorInstance.get<Router>(Router);
    this.dialog = AppConfig.InjectorInstance.get<MatDialog>(MatDialog);
  }

  ngOnInit() {
    this.getUserByPage(0);
  }

  getUserByPage(pageNo: number) {
    this.pageNo = pageNo;
    this.userService.getUserByPage(pageNo).subscribe((result: any) => {
      this.userList = result.users;
      this.recordsLength = result.records;
    });
  }

  onPaginateChange(event) {
    let pageNo: number = event.pageIndex;
    this.getUserByPage(pageNo);
  }

  addUser() {
    this.selectedUser = new User();
    this.selectedUser.id = 0;
    this.selectedUser.firstName = '';
    this.selectedUser.lastName = '';
    this.selectedUser.username = '';
    this.selectedUser.password = '';
  }

  editUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: "Alert", message: 'Are you sure to delete the User??', error: true, showYesNoButton: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.return) {
        this.userService.deleteUser(id).subscribe((result: any) => {
          this.getUserByPage(this.pageNo);
        });
      }
    });
  }

}
