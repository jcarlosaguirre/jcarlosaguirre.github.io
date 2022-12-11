import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Note from "../models/Note";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _notesChange = new BehaviorSubject<Note[] | undefined>(undefined);
  notesChange$: Observable<Note[] | undefined> = this._notesChange.asObservable();

  private _screenBlocker = new BehaviorSubject<boolean | undefined>(undefined);
  screenBlocker$: Observable<boolean | undefined> = this._screenBlocker.asObservable();

  private _updateNotes = new BehaviorSubject<any | undefined>(undefined);
  updateNotes$: Observable<any | undefined> = this._updateNotes.asObservable();

  constructor() { }

  setNotes(notes: Note[]): void {
    this._notesChange.next( notes );
  }

  blockScreen( status: boolean ) {
    this._screenBlocker.next( status );
  }

  updateNotesList( notesData: any ) {
    this._updateNotes.next( notesData );
  }

}
