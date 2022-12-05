import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Team } from '../model';
import { DialogBoxComponent } from '../dialog/dialog.box.component';
import { ApiConfig } from '../config';

@Component({
    selector: 'app-team-form',
    templateUrl: './team.form.component.html',
    styleUrls: ['./team.component.css']
})

export class TeamFormComponent implements OnChanges, OnInit {
    @Input() team: Team;
    teamForm: FormGroup;
    showSpinner: boolean = false;
    private file;
    private url;
    private imageBasePath: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private teamService: TeamService,
        private dialog: MatDialog
    ) {
        this.imageBasePath = ApiConfig.getRootUrl();
    }
    ngOnInit() {
        this.teamForm = this.formBuilder.group({
            team_id: ['', [Validators.nullValidator]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            code: ['', [Validators.required, Validators.minLength(2)]],
            image: ['', [Validators.nullValidator]],
            status: [false, [Validators.nullValidator]],
        });
    }
    ngOnChanges() {
        if (this.team) {
            this.setFormData(this.team, this.teamForm);
        }
    }

    setFormData(team: Team, teamForm: FormGroup) {
        Object.keys(team).map(function (key) {
            teamForm.controls[key].setValue(team[key]);
        });
    }

    getNameError() {
        return this.teamForm.controls.name.hasError('required') ? 'You must enter a value' :
            this.teamForm.controls.name.hasError('minlength') ? 'Team name must not be less than 3 characters' : '';
    }

    getCodeError() {
        return this.teamForm.controls.code.hasError('required') ? 'You must enter a value' :
            this.teamForm.controls.code.hasError('minlength') ? 'Team Code must not be less than 2 characters' : '';
    }

    saveTeam() {
        this.showSpinner = true;
        if (this.file) {
            this.teamService.uploadimage(this.file).subscribe((result: any) => {
                if (result.success) {
                    let t: Team = this.teamForm.value;
                    t.image = result.fileName;
                    this.teamService.saveTeam(t).subscribe((result: any) => {
                        this.showSpinner = false;
                        const dialogRef = this.dialog.open(DialogBoxComponent, {
                            width: '400px',
                            data: { title: "Success", message: result.success }
                        });

                        dialogRef.afterClosed().subscribe(result2 => {
                            this.cancel();
                        });
                    });
                }
            });
        } else {
            let t: Team = this.teamForm.value;
            this.teamService.saveTeam(t).subscribe((result: any) => {
                this.showSpinner = false;
                const dialogRef = this.dialog.open(DialogBoxComponent, {
                    width: '400px',
                    data: { title: "Success", message: result.success }
                });

                dialogRef.afterClosed().subscribe(result2 => {
                    this.cancel();
                });
            });
        }
    }
    cancel() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
        this.router.navigateByUrl(this.router.url);
    }
    onFileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
            this.file = file;
        }
    }
}