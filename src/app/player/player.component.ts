import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services';
import { AppConfig, ApiConfig } from '../config';
import { Player } from '../model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  displayedColumns: string[] = ['player_id', 'name', 'date_of_birth', 'batting_style', 'bowling_style', 'action'];
  selectedPlayer: Player;
  playerList: Player[];

  private recordsLength = 0;
  private playerService: PlayerService;
  private router: Router;
  private dialog: MatDialog;
  private pageNo: number;
  private imageBasePath: string;

  constructor() {
    this.playerService = AppConfig.InjectorInstance.get<PlayerService>(PlayerService);
    this.router = AppConfig.InjectorInstance.get<Router>(Router);
    this.dialog = AppConfig.InjectorInstance.get<MatDialog>(MatDialog);
    this.imageBasePath = ApiConfig.getRootUrl();
  }

  ngOnInit() {
    this.getTeamByPage(0);
  }

  getTeamByPage(pageNo: number) {
    this.pageNo = pageNo;
    this.playerService.getPlayerByPage(pageNo).subscribe((result: any) => {
      this.playerList = result.players;
      this.recordsLength = result.records;
    });
  }

  onPaginateChange(event) {
    let pageNo: number = event.pageIndex;
    this.getTeamByPage(pageNo);
  }

  addPlayer() {
    this.selectedPlayer = new Player();
    this.selectedPlayer.player_id = 0;
    this.selectedPlayer.country_id = undefined;
    this.selectedPlayer.name = '';
    this.selectedPlayer.team_id = undefined;
  }

  editPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  deletePlayer(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: "Alert", message: 'Are you sure to delete the Team??', error: true, showYesNoButton: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.return) {
        this.playerService.deletePlayer(id).subscribe((result: any) => {
          this.getTeamByPage(this.pageNo);
        });
      }
    });
  }

}
