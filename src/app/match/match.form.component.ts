import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from '../services';
import { Router } from '@angular/router';
import { MatDialog, MatSelectChange } from '@angular/material';
import { Match, Team } from '../model';
import { DialogBoxComponent } from '../dialog/dialog.box.component';
import { ApiConfig } from '../config';

@Component({
    selector: 'app-match-form',
    templateUrl: './match.form.component.html',
    styleUrls: ['./match.component.css']
})

export class MatchFormComponent implements OnChanges, OnInit {

    @Input() match: Match;
    @Input() teamList: Team[];
    matchForm: FormGroup;
    showSpinner: boolean = false;
    private file;
    private url;
    private imageBasePath: string;
    private team_id_1: number;
    private team_id_2: number;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private matchService: MatchService,
        private dialog: MatDialog,
    ) {
        this.imageBasePath = ApiConfig.getRootUrl();
    }
    ngOnInit() {
        this.matchForm = this.formBuilder.group({
            match_id: ['', [Validators.nullValidator]],
            descr: ['', [Validators.required, Validators.minLength(3)]],
            team_id_1: ['', [Validators.required]],
            team_id_2: ['', [Validators.required]],
            date1: ['', [Validators.required]],
            time1: ['', [Validators.required]],
            stadium: ['', [Validators.nullValidator]]
        });
    }
    ngOnChanges() {
        if (this.match) {
            this.setFormData(this.match, this.matchForm);

        }
    }

    setFormData(match: Match, matchForm: FormGroup) {
        Object.keys(match).map((key) => {
            matchForm.controls[key].setValue(match[key]);
        });
    }

    getDescrError() {
        return this.matchForm.controls.descr.hasError('required') ? 'You must enter a value' :
            this.matchForm.controls.descr.hasError('minlength') ? 'Description must not be less than 3 characters' : '';
    }
    getTeam_id_1Error() {
        return this.matchForm.controls.team_id_1.hasError('required') ? 'You must select team-1' : '';
    }
    getTeam_id_2Error() {
        return this.matchForm.controls.team_id_2.hasError('required') ? 'You must select team-2' : '';
    }
    getDateError() {
        return this.matchForm.controls.date1.hasError('required') ? 'You must enter a date' : '';
    }
    getTimeError() {
        return this.matchForm.controls.time1.hasError('required') ? 'You must enter a time' : '';
    }

    saveMatch() {
        this.showSpinner = true;
        let m: Match = this.matchForm.value;
        this.matchService.saveMatch(m).subscribe((result: any) => {
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
    cancel() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
        this.router.navigateByUrl(this.router.url);
    }
    onTeamSelection(event: MatSelectChange) {
        if (event.source.ngControl.name == "team_id_1") {
            this.team_id_1 = event.value;
        }
        if (event.source.ngControl.name == "team_id_2") {
            this.team_id_2 = event.value;
        }
        if (this.team_id_1 && this.team_id_2) {
            if (this.team_id_1 == this.team_id_2) {
                const dialogRef = this.dialog.open(DialogBoxComponent, {
                    width: '400px',
                    data: { title: "Alert", message: 'Team-1 and Team-2 can not be same. ', error: true, showYesNoButton: false }
                });
                dialogRef.afterClosed().subscribe(result2 => {
                    this.matchForm.controls[event.source.ngControl.name].setValue('');
                });
            } else {
                let team1:Team = this.filterTeam(this.team_id_1);
                let team2:Team = this.filterTeam(this.team_id_2);
                this.matchForm.controls['descr'].setValue(team1.name + ' (' + team1.code + ') Vs ' + team2.name + ' (' + team2.code + ')');
            }
        }
    }
    filterTeam(id: number): Team {
        let team: Team[] = this.teamList.filter(t => t.team_id == id);
        return team[0];
    }
}