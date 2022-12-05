import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services';
import { AppConfig, ApiConfig } from '../config';
import { Team } from '../model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'image', 'status', 'action'];
  selectedTeam: Team;
  teamList: Team[];

  private recordsLength = 0;
  private teamService: TeamService;
  private router: Router;
  private dialog: MatDialog;
  private pageNo: number;
  private imageBasePath: string;

  constructor() {
    this.teamService = AppConfig.InjectorInstance.get<TeamService>(TeamService);
    this.router = AppConfig.InjectorInstance.get<Router>(Router);
    this.dialog = AppConfig.InjectorInstance.get<MatDialog>(MatDialog);
    this.imageBasePath = ApiConfig.getRootUrl();
  }

  ngOnInit() {
    this.getTeamByPage(0);
  }

  getTeamByPage(pageNo: number) {
    this.pageNo = pageNo;
    this.teamService.getTeamByPage(pageNo).subscribe((result: any) => {
      this.teamList = result.teams;
      this.recordsLength = result.records;
    });
  }

  onPaginateChange(event) {
    let pageNo: number = event.pageIndex;
    this.getTeamByPage(pageNo);
  }

  addTeam() {
    this.selectedTeam = new Team();
    this.selectedTeam.team_id = 0;
    this.selectedTeam.name = '';
    this.selectedTeam.code = '';
    this.selectedTeam.image = '';
  }

  editTeam(team: Team) {
    this.selectedTeam = team;
  }

  deleteTeam(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: "Alert", message: 'Are you sure to delete the Team??', error: true, showYesNoButton: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.return) {
        this.teamService.deleteTeam(id).subscribe((result: any) => {
          this.getTeamByPage(this.pageNo);
        });
      }
    });
  }

}
