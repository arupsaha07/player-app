import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';
import { Match } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseApi {

  constructor() { 
    super();
  }
  getMatchByPage(pageNo?: number) {
    if (!pageNo) {
      pageNo = 0;
    }

    this.url = ApiConfig.getBaseUrl() + "/match/getByPage";
    return this.getByPage(pageNo);
  }
  getMatchById(id: number) {
    if (id) {
      this.url = ApiConfig.getBaseUrl() + "/match/get/" + id;
      return this.get();
    }
  }
  getMatches(){
    this.url = ApiConfig.getBaseUrl()+"/match/getAll";
    return this.get();
  }
  saveMatch(match: Match) {
    if (match.match_id) {
      this.url = ApiConfig.getBaseUrl() + "/match/update";
    } else {
      this.url = ApiConfig.getBaseUrl() + "/match/add";
    }
    return this.save(match);
  }
  deleteMatch(id:number){
    this.url = ApiConfig.getBaseUrl() + "/match/delete";
    return this.delete(id);
  }
}
