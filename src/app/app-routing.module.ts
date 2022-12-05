import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountryComponent } from './country';
import { UserComponent } from './user';
import { TeamComponent } from './team';
import { PlayerComponent } from './player';
import { MatchComponent } from './match';
import { File404Component } from './errors/file404/file404.component';

const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'player', component: PlayerComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'match', component: MatchComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },

  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: File404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, { onSameUrlNavigation: 'reload' }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// const appRoutes: Routes = [

//   //Site routes goes here 
//   { 
//       path: '', 
//       component: SiteLayoutComponent,
//       children: [
//         { path: '', component: HomeComponent, pathMatch: 'full'},
//         { path: 'about', component: AboutComponent }
//       ]
//   },

//   // App routes goes here here
//   { 
//       path: '',
//       component: AppLayoutComponent, 
//       children: [
//         { path: 'dashboard', component: DashboardComponent },
//         { path: 'profile', component: ProfileComponent }
//       ]
//   },

//   //no layout routes
//   { path: 'login', component: LoginComponent},
//   { path: 'register', component: RegisterComponent },
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];