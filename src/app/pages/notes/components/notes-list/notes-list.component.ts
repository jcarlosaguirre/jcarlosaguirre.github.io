import {Component, Input, OnInit} from '@angular/core';
import {faAlignLeft, faHeading, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import Note from "../../models/Note";
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  @Input('notesList') notesList: Note[] = [];

  selectedNote: {
    position: number,
    note: Note | null
  } = { position: 0, note: null };

  reloadNotes: boolean = false;
  showEditor: boolean = false;

  availableIcons: any = {
    none: null,
    userIcon: faUser,
    searchIcon: faSearch,
    noteTitle: faHeading,
    noteContent: faAlignLeft
  }

  constructor( private notesService: NotesService ) {
  }

  ngOnInit() {
  }

  editNote(
    e: { state: boolean, data: Note | null },
    notePosition: number
  ){

    if( notePosition < 0 ){

      if( e.state ){
        console.log( e.data )
        const {title, content} = e.data!!
        this.notesService.updateNotesList({
          position: this.selectedNote.position,
          data: {
            title,
            content
          }
        })
        // this.notesList[ this.selectedNote.position ].setTitle( title!! )
        // this.notesList[ this.selectedNote.position ].setContent( content!! )
        // this.notesList[ this.selectedNote.position ].update()
        // console.log( this.notesList[ this.selectedNote.position ] )
        this.reloadNotes = true;

        setTimeout( () => {
          this.reloadNotes = false;
        }, 1000)
      }

      this.showEditor = false;

      setTimeout( () => {
        this.selectedNote.note = null;
        this.notesService.blockScreen( false );
      },500)
    }
    else{

      this.selectedNote.note = this.notesList[ notePosition ];
      this.selectedNote.position = notePosition;
      this.notesService.blockScreen( true )
      this.showEditor = e.state;
    }
  }
}
