import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { ApiConfig } from '../config';
import { Player } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseApi {

  constructor() {
    super();
  }
  getPlayerByPage(pageNo?: number) {
    if (!pageNo) {
      pageNo = 0;
    }

    this.url = ApiConfig.getBaseUrl() + "/player/getByPage";
    return this.getByPage(pageNo);
  }
  getPlayerById(id: number) {
    if (id) {
      this.url = ApiConfig.getBaseUrl() + "/player/get/" + id;
      return this.get();
    }
  }
  getPlayers() {
    this.url = ApiConfig.getBaseUrl() + "/player/getAll";
    return this.get();
  }
  savePlayer(player: Player) {
    if (player.player_id) {
      this.url = ApiConfig.getBaseUrl() + "/player/update";
    } else {
      this.url = ApiConfig.getBaseUrl() + "/player/add";
    }
    return this.save(player);
  }
  deletePlayer(id: number) {
    this.url = ApiConfig.getBaseUrl() + "/player/delete";
    return this.delete(id);
  }

  uploadimage(file: Blob) {
    return this.upload(file, "player");
  }
}