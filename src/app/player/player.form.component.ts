import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayerService, CountryService, TeamService } from '../services';
import { Router } from '@angular/router';
import { MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { Player, Country, Team } from '../model';
import { DialogBoxComponent } from '../dialog/dialog.box.component';
import { ApiConfig } from '../config';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-player-form',
    templateUrl: './player.form.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerFormComponent implements OnChanges, OnInit {

    @Input() player: Player;
    playerForm: FormGroup;
    showSpinner: boolean = false;

    private file;
    private url;
    private imageBasePath: string;
    public countryList: Country[];
    public filteredCountries: Observable<Country[]>;
    private selectedCountry: Country;
    private teamList: Team[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private playerService: PlayerService,
        private dialog: MatDialog,
        private countryService: CountryService,
        private teamService: TeamService
    ) {
        this.imageBasePath = ApiConfig.getRootUrl();
        this.countryService.getCountries().subscribe((result: Country[]) => this.countryList = result);
        this.teamService.getTeams().subscribe((result: Team[]) => this.teamList = result);
    }

    ngOnInit() {
        this.playerForm = this.formBuilder.group({
            player_id: ['', [Validators.nullValidator]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            team_id: ['', [Validators.required]],
            country_id: ['', [Validators.required]],
            date_of_birth: [false, [Validators.nullValidator]],
            batting_style: ['', [Validators.nullValidator]],
            bowling_style: ['', [Validators.nullValidator]],
            image: ['', [Validators.nullValidator]],
        });

        this.filteredCountries = this.playerForm.get('country_id').valueChanges
            .pipe(
                map((value) => {
                    return this._filterCountry(value);
                })
            );
    }

    ngOnChanges() {
        if (this.player) {
            this.setFormData(this.player, this.playerForm);
        }
    }

    setFormData(player: Player, playerForm: FormGroup) {
        Object.keys(player).map((key) => {
            if (key == "country_id") {
                let filter = this._filterCountry(player[key]);
                this.selectedCountry = filter[0];
                playerForm.controls[key].setValue(filter[0]);
            } else {
                playerForm.controls[key].setValue(player[key]);
            }
        });
    }
    _filterCountry(value: any): Country[] {
        let data;
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return this.countryList.filter(c => c.name.toLowerCase().indexOf(filterValue) === 0);
        }
        else {
            return this.countryList.filter(c => c.country_id == value);
        }
    }
    getNameError() {
        return this.playerForm.controls.name.hasError('required') ? 'You must enter a value' :
            this.playerForm.controls.name.hasError('minlength') ? 'Team name must not be less than 3 characters' : '';
    }
    getTeamError() {
        return this.playerForm.controls.team_id.hasError('required') ? "You must select a team" : '';
    }
    getCountryError() {
        return this.playerForm.controls.country_id.hasError('required') ? "You must select a country" : '';
    }

    savePlayer() {
        this.showSpinner = true;
        let p: Player = this.playerForm.value;
        p.country_id = this.selectedCountry.country_id;
        if (this.file) {
            this.playerService.uploadimage(this.file).subscribe((result: any) => {
                if (result.success) {
                    p.image = result.fileName;
                    this.playerService.savePlayer(p).subscribe((result: any) => {
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
            this.playerService.savePlayer(p).subscribe((result: any) => {
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
    displayFn(country: Country) {
        return country ? country.name : '';
    }
    onSelectionChanged(event: MatAutocompleteSelectedEvent) {
        this.selectedCountry = event.option.value;
    }


}