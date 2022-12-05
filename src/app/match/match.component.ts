import { Component, OnInit } from '@angular/core';
import { MatchService, TeamService } from '../services';
import { AppConfig, ApiConfig } from '../config';
import { Match, Team } from '../model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog/dialog.box.component';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  displayedColumns: string[] = ['descr', 'team_id_1', 'team_id_2', 'date1', 'time1', 'action'];
  selectedMatch: Match;
  matchList: Match[];

  private recordsLength = 0;
  private matchService: MatchService;
  private teamService: TeamService;
  private router: Router;
  private dialog: MatDialog;
  private pageNo: number;
  private imageBasePath: string;

  private teamList: Team[];

  constructor() {
    this.matchService = AppConfig.InjectorInstance.get<MatchService>(MatchService);
    this.teamService = AppConfig.InjectorInstance.get<TeamService>(TeamService);
    this.router = AppConfig.InjectorInstance.get<Router>(Router);
    this.dialog = AppConfig.InjectorInstance.get<MatDialog>(MatDialog);
    this.imageBasePath = ApiConfig.getRootUrl();

    this.teamService.getTeams().subscribe((result: Team[]) => this.teamList = result);
  }

  ngOnInit() {
    this.getMatchByPage(0);
  }
  getMatchByPage(pageNo: number) {
    this.pageNo = pageNo;
    this.matchService.getMatchByPage(pageNo).subscribe((result: any) => {
      this.matchList = result.matches;
      this.recordsLength = result.records;
    });
  }
  onPaginateChange(event) {
    let pageNo: number = event.pageIndex;
    this.getMatchByPage(pageNo);
  }

  addMatch() {
    this.selectedMatch = new Match();
    this.selectedMatch.match_id = 0;
    this.selectedMatch.team_id_1 = 0;
    this.selectedMatch.team_id_2 = 0;
    this.selectedMatch.descr = undefined;
    this.selectedMatch.date1 = undefined;
    this.selectedMatch.time1 = undefined;
    this.selectedMatch.stadium = undefined;
  }

  editMatch(match: Match) {
    this.selectedMatch = match;
  }
  deleteMatch(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: { title: "Alert", message: 'Are you sure to delete the Match??', error: true, showYesNoButton: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.return) {
        this.matchService.deleteMatch(id).subscribe((result: any) => {
          this.getMatchByPage(this.pageNo);
        });
      }
    });
  }
  filterTeam(id: number): string {
    let team: Team[] = this.teamList.filter(t => t.team_id == id);
    return team[0].name;
  }

}
