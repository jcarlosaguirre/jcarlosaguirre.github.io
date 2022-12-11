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

  @Input('noteData') noteData: Note = new Note('0', 'new note', 'note content');
  @Output('selected') selected = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

}
