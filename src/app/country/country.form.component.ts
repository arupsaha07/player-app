import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../model';
import { CountryService } from '../services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
    selector: 'app-country-form',
    templateUrl: './country.form.component.html'
})

export class CountryFormComponent implements OnChanges, OnInit {

    @Input() country: Country;
    countryForm: FormGroup;
    showSpinner: boolean = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private countryService: CountryService, private dialog: MatDialog) {

    }
    ngOnChanges() {
        if (this.country) {
            this.setFormData(this.country,this.countryForm);
        }
    }
    ngOnInit() {
        this.countryForm = this.formBuilder.group({
            country_id: ['', [Validators.nullValidator]],
            country_code: ['', [Validators.required, Validators.minLength(2)]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            status: [false, [Validators.nullValidator]]
        });
    }
    setFormData(country:Country, countryForm:FormGroup){
        Object.keys(this.country).map(function (key) {
            countryForm.controls[key].setValue(country[key]);
        });
    }

    getNameError() {
        return this.countryForm.controls.name.hasError('required') ? 'You must enter a value' :
            this.countryForm.controls.name.hasError('minlength') ? 'Country name must not be less than 3 characters' : '';
    }
    getCountryCodeError() {
        return this.countryForm.controls.country_code.hasError('required') ? 'You must enter a value' :
            this.countryForm.controls.country_code.hasError('minlength') ? 'Country code not be less than 2 characters' : '';
    }

    saveCountry() {
        this.showSpinner = true;
        this.countryService.saveCountry(this.countryForm.value).subscribe((result:any)=>{
            this.showSpinner = false;
            const dialogRef = this.dialog.open(DialogBoxComponent, {
                width: '400px',
                data: { title:"Success", message: result.success }
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