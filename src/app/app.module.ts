import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { AutoProcessComponent } from './presentation/feature/auto-process/auto-process.component';
import { ManualProcessComponent } from './presentation/feature/manual-process/manual-process.component';
import { AppRoutingModule } from "./presentation/engine/app-routing/app-routing.module";
import { WelcomeComponent } from './presentation/feature/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    AutoProcessComponent,
    ManualProcessComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
