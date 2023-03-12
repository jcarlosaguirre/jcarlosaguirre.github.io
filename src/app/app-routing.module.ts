import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'notes',
    component: AppComponent
  },
  {
    path: 'notes',
    loadChildren: () => import("./pages/notes/notes.module").then((m) => m.NotesModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
