import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'notes',
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule )
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
