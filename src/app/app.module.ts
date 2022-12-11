import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import {StorageService} from "./services/storage.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SpinLoaderComponent } from './components/spin-loader/spin-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule
    ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
