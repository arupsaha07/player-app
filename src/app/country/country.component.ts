import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services';
import { AppConfig } from '../config';
import { Country } from '../model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  displayedColumns: string[] = ['country_id', 'country_code', 'name', 'status', 'action'];
  selectedCountry: Country;
  countryList: Country[];

  private recordsLength = 0;
  private countryService: CountryService;
  private router: Router;
  private dialog: MatDialog;
  private pageNo:number;

  constructor() {
    this.countryService = AppConfig.InjectorInstance.get<CountryService>(CountryService);
    this.router = AppConfig.InjectorInstance.get<Router>(Router);
    this.dialog = AppConfig.InjectorInstance.get<MatDialog>(MatDialog);
  }

  ngOnInit() {
    this.getCounryByPage(0);
  }

  getCounryByPage(pageNo: number) {
    this.pageNo = pageNo;
    this.countryService.getCountryByPage(pageNo).subscribe((result: any) => {
      this.countryList = result.countries;
      this.recordsLength = result.records;
    });
  }

  onPaginateChange(event) {
    let pageNo: number = event.pageIndex;
    this.getCounryByPage(pageNo);
  }

  addCountry() {
    this.selectedCountry = new Country;
    this.selectedCountry.country_id = 0;
    this.selectedCountry.name = '';
    this.selectedCountry.country_code = '';
  }

  editCountry(country: Country) {
    this.selectedCountry = country;
  }

  deleteCountry(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: "Alert", message: 'Are you sure to delete the country??', error: true, showYesNoButton: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.return) {
        this.countryService.deleteCountry(id).subscribe((result: any) => {
          this.getCounryByPage(this.pageNo);
        });
      }
    });
  }


}
