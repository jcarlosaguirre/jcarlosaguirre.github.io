import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import {NotesLayoutComponent} from "./notes-layout/notes-layout.component";
import {NotesListComponent} from "./components/notes-list/notes-list.component";
import {NotesCardComponent} from "./components/notes-card/notes-card.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import {NotesService} from "./services/notes.service";
import {NgxMasonryModule} from "ngx-masonry";
import {AnimationBuilder} from "@angular/animations";
import {StorageService} from "../../services/storage.service";


@NgModule({
  declarations: [
    NotesLayoutComponent,
    NotesListComponent,
    NotesCardComponent,
    NotesFormComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxMasonryModule,
  ],
  providers: [
    NotesService,
    StorageService
  ]
})
export class NotesModule { }
