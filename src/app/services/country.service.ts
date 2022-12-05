import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';
import { Country } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseApi {

  constructor() {
    super();
  }

  getCountryByPage(pageNo?: number) {
    if (!pageNo) {
      pageNo = 0;
    }

    this.url = ApiConfig.getBaseUrl() + "/country/getByPage";
    return this.getByPage(pageNo);
  }
  getCountryById(id: number) {
    if (id) {
      this.url = ApiConfig.getBaseUrl() + "/country/get/" + id;
      return this.get();
    }
  }
  getCountries() {
    this.url = ApiConfig.getBaseUrl() + "/country/getAll";
    return this.get();
  }
  saveCountry(country: Country) {
    if (country.country_id) {
      this.url = ApiConfig.getBaseUrl() + "/country/update";
    } else {
      this.url = ApiConfig.getBaseUrl() + "/country/add";
    }
    return this.save(country);
  }

  deleteCountry(id: number) {
    this.url = ApiConfig.getBaseUrl() + "/country/delete";
    return this.delete(id);
  }
}
