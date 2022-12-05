import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';
import { Team } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseApi{

  constructor() { 
    super();
  }

  getTeamByPage(pageNo?: number) {
    if (!pageNo) {
      pageNo = 0;
    }

    this.url = ApiConfig.getBaseUrl() + "/team/getByPage";
    return this.getByPage(pageNo);
  }
  getTeamById(id: number) {
    if (id) {
      this.url = ApiConfig.getBaseUrl() + "/team/get/" + id;
      return this.get();
    }
  }
  getTeams(){
    this.url = ApiConfig.getBaseUrl()+"/team/getAll";
    return this.get();
  }
  saveTeam(team: Team) {
    if (team.team_id) {
      this.url = ApiConfig.getBaseUrl() + "/team/update";
    } else {
      this.url = ApiConfig.getBaseUrl() + "/team/add";
    }
    return this.save(team);
  }
  deleteTeam(id:number){
    this.url = ApiConfig.getBaseUrl() + "/team/delete";
    return this.delete(id);
  }

  uploadimage(file: Blob) {
    return this.upload(file, "team");
  }

}
