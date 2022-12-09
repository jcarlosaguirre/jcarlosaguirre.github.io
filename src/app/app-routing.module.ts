import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes', pathMatch: 'full'
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
