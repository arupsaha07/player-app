import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';
import { User } from '../model';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApi {

  constructor() {
    super();
  }
  getUserByPage(pageNo?: number) {
    if (!pageNo) {
      pageNo = 0;
    }

    this.url = ApiConfig.getBaseUrl() + "/user/getByPage";
    return this.getByPage(pageNo);
  }
  getUserById(id: number) {
    if (id) {
      this.url = ApiConfig.getBaseUrl() + "/user/get/" + id;
      return this.get();
    }
  }
  getUsers(){
    this.url = ApiConfig.getBaseUrl()+"/user/getAll";
    return this.get();
  }
  saveUser(user: User) {
    if (user.id) {
      this.url = ApiConfig.getBaseUrl() + "/user/update";
    } else {
      this.url = ApiConfig.getBaseUrl() + "/user/register";
    }
    return this.save(user);
  }
  deleteUser(id:number){
    this.url = ApiConfig.getBaseUrl() + "/user/delete";
    return this.delete(id);
  }
}
