import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesLayoutComponent} from "./notes-layout/notes-layout.component";
import {NotesListComponent} from "./components/notes-list/notes-list.component";

const routes: Routes = [
  {
    path: '',
    component: NotesLayoutComponent,
    children: [
      // { path: '', component: NotesListComponent},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
