import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faAlignLeft, faHeading, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import Note from "../../models/Note";
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit, OnChanges {

  @Input('notesList') notesList: Note[];
  filteredNotes: Note[];
  searchValue: string;

  selectedNote: {
    position: number,
    note: Note | null
  };

  reloadNotes: boolean;
  showEditor: boolean;

  availableIcons: any = {
    none: null,
    userIcon: faUser,
    searchIcon: faSearch,
    noteTitle: faHeading,
    noteContent: faAlignLeft
  }

  constructor( private notesService: NotesService ) {
    this.notesList = [];
    this.filteredNotes = [];
    this.searchValue = '';
    this.selectedNote = { position: 0, note: null };

    this.reloadNotes = false;
    this.showEditor = false;
  }

  ngOnInit() {
    this.filteredNotes = [ ...this.notesList ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if( !changes['notesList'].firstChange ){
      this.notesList = [ ...changes['notesList'].currentValue ];
      this.filteredNotes = [ ...this.notesList ];
    }
  }

  editNote(
    e: { state: boolean, data: Note | null, delete: boolean },
    notePosition: number
  ){

    if( notePosition < 0 ){

      if( e.delete ){
        this.notesService.updateNotesList({
          position: this.selectedNote.position,
          delete: true
        })
      }

      else if( e.state ){
        const {title, content} = e.data!!
        this.notesService.updateNotesList({
          position: this.selectedNote.position,
          data: {
            title,
            content
          }
        })
      }

      this.reloadNotes = true;
      setTimeout( () => {
        this.reloadNotes = false;
      }, (e.state && !e.delete) ? 1000:0)

      this.showEditor = false;
      // setTimeout( () => {
        this.selectedNote.note = null;
        this.notesService.blockScreen( false );
      // },500)
    }
    else{

      this.selectedNote.note = this.notesList[ notePosition ];
      this.selectedNote.position = notePosition;
      this.notesService.blockScreen( true )
      this.showEditor = e.state;
    }
  }

  filterNotesBySearch(e: KeyboardEvent){
    if( this.searchValue.length == 0 ) this.filteredNotes = [ ...this.notesList ];
    this.filteredNotes = this.notesList.filter(note => {
      return note.title?.toLowerCase().includes( this.searchValue.toLowerCase() ) ||
             note.content?.toLowerCase().includes( this.searchValue.toLowerCase() )
    })
  }

}
