import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutoProcessComponent } from './feature/auto-process/auto-process.component';
import { ManualProcessComponent } from './feature/manual-process/manual-process.component';
import { AppRoutingModule } from "./engine/app-routing/app-routing.module";
import { WelcomeComponent } from './feature/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    AutoProcessComponent,
    ManualProcessComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
