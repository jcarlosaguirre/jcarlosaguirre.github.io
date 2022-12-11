import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinLoaderComponent} from "../components/spin-loader/spin-loader.component";



@NgModule({
  declarations: [
    SpinLoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinLoaderComponent
  ]
})
export class SharedModule { }
