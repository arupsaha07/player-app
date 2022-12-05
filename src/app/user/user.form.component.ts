import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { User } from '../model';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
    selector: 'app-user-form',
    templateUrl: './user.form.component.html',
})

export class UserFormComponent implements OnChanges, OnInit {

    @Input() user: User;
    userForm: FormGroup;
    showSpinner: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private dialog: MatDialog
    ) {

    }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            id: ['', [Validators.nullValidator]],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            status: [false, [Validators.nullValidator]],
            // token: ['', [Validators.nullValidator]],
        })
    }
    ngOnChanges() {
        if (this.user) {
            this.setFormData(this.user, this.userForm);
        }
    }

    setFormData(user: User, userForm: FormGroup) {
        Object.keys(this.user).map(function (key) {
            if (key != "token")
                userForm.controls[key].setValue(user[key]);
        });
    }

    getFirstNameError() {
        return this.userForm.controls.firstName.hasError('required') ? 'You must enter a value' :
            this.userForm.controls.firstName.hasError('minlength') ? 'First name must not be less than 3 characters' : '';
    }

    getLastNameError() {
        return this.userForm.controls.lastName.hasError('required') ? 'You must enter a value' :
            this.userForm.controls.lastName.hasError('minlength') ? 'Last name must not be less than 3 characters' : '';
    }
    getUsernameError() {
        return this.userForm.controls.username.hasError('required') ? 'You must enter a value' :
            this.userForm.controls.username.hasError('minlength') ? 'Username must not be less than 3 characters' : '';
    }
    getPasswordError() {
        return this.userForm.controls.password.hasError('required') ? 'You must enter a value' :
            this.userForm.controls.password.hasError('minlength') ? 'Password must not be less than 3 characters' : '';
    }

    saveUser() {
        this.showSpinner = true;
        this.userService.saveUser(this.userForm.value).subscribe((result: any) => {
            this.showSpinner = false;
            const dialogRef = this.dialog.open(DialogBoxComponent, {
                width: '400px',
                data: { title: "Success", message: result.success }
            });

            dialogRef.afterClosed().subscribe(result => {
                this.cancel();
            });
        });
    }
    cancel() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
        this.router.navigateByUrl(this.router.url);
    }
}