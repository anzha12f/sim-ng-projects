import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { Proj01Component } from './project-connect/proj01/proj01.component';
import { ListuserService } from './project-connect/services/listuser.service';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    Proj01Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{ path: "", component: Proj01Component}])
    
  ],
  providers: [ListuserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
