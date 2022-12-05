import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends BaseApi {
  constructor() {
    super();
  }
  
  login(username:string,password:string){
    this.url = ApiConfig.getBaseUrl()+"/user/authenticate";
    return this.authenticate(username,password);
  }

}
