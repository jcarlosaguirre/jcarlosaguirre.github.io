import {Attribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import Note from "../../models/Note";
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NotesCardComponent implements OnInit {

  @Input('noteData') noteData: Note = new Note();
  @Output('selected') selected = new EventEmitter()

  editing: boolean = false;

  constructor(
    private router: Router ) {
  }

  ngOnInit(): void {
  }

  /*editNote(){
    this.editing = !this.editing;
    this.selected.emit( { state: this.editing, data: null } );
  }*/


}
