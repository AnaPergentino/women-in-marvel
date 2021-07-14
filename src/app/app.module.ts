import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './app-material.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MotivationComponent } from './motivation/motivation.component';
import { ComparisionComponent } from './comparision/comparision.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharactersListComponent,
    NavBarComponent,
    MotivationComponent,
    ComparisionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
