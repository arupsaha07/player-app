import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { AppConfig } from './config';

// Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { CountryComponent, CountryFormComponent } from './country';
import { DialogComponent } from './dialog/dialog.component';
import { DialogBoxComponent } from './dialog/dialog.box.component';
import { UserComponent, UserFormComponent } from './user';
import { TeamComponent, TeamFormComponent } from './team';
import { PlayerComponent, PlayerFormComponent } from './player';
import { MatchComponent, MatchFormComponent } from './match';
import { File404Component } from './errors/file404/file404.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    CountryComponent,
    CountryFormComponent,
    DialogComponent,
    DialogBoxComponent,
    UserComponent,
    UserFormComponent,
    TeamComponent,
    TeamFormComponent,
    PlayerComponent,
    PlayerFormComponent,
    MatchComponent,
    MatchFormComponent,
    File404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiModule,
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [DialogBoxComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    AppConfig.InjectorInstance = this.injector;
  }
}

