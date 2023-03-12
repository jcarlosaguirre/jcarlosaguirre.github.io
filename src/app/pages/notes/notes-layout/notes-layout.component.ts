import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {NotesService} from "../services/notes.service";
import Note from "../models/Note";
import {
  faFileArrowUp,
  faFileCirclePlus,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-notes-layout',
  templateUrl: './notes-layout.component.html',
  styleUrls: ['./notes-layout.component.scss']
})
export class NotesLayoutComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  blockScreen: boolean = false;


  notes: Note[];

  addNewIcon = faFileCirclePlus;
  exportIcon = faFileExport;
  importIcon = faFileArrowUp;

  constructor(
    private notesService: NotesService,
    private storageService: StorageService )
  {
    this.subscriptions = new Subscription();
    this.notes = [];
  }

  ngOnInit(): void {

    this.notes = this.storageService.getFromLocalStorage('notesList') || [];

    let screenSubscription = this.notesService.screenBlocker$.subscribe(
      ( status ) => {
        this.blockScreen = status!!;
      },
      ( err ) => {
        console.error( err )
      }
    )

    let notesSubscription = this.notesService.updateNotes$.subscribe(
      ( notesData ) => {

        if( notesData ) {
          if( !notesData.delete ) {
            let note: Note = new Note(
              this.notes[ notesData.position ].id,
              this.notes[ notesData.position ].title,
              this.notes[ notesData.position ].content,
            );

            note.title = notesData.data.title;
            note.content = notesData.data.content;
            note.update();

            this.notes.splice(notesData.position, 1);
            this.notes = [
              note,
              ...this.notes
            ];
          }
          else {
            this.notes.splice(notesData.position, 1);
            this.notes = [
              ...this.notes
            ];
          }

          this.storageService.setIntoLocalStorage('notesList', this.notes);
        }
      },
      ( err ) => {
        console.error( err )
      }
    )

    this.subscriptions.add( screenSubscription );
    this.subscriptions.add( notesSubscription );
  }

  createNote() {
    this.notes = [
      ...this.notes,
      new Note(
        (this.notes.length + 1).toString(),
        "new Note",
        "content"
      )
    ]

    this.storageService.setIntoLocalStorage('notesList', this.notes);
  }

  importNotes() {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {

      if( e.target ){
        let target = e.target as HTMLInputElement;
        let file = target.files!![0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
          let content = readerEvent.target!!.result; // this is the content!
          this.notes = [
            ...this.notes,
            ...JSON.parse(content as string)
          ]
          this.storageService.setIntoLocalStorage('notesList', JSON.parse(content as string));        }
      }
    }

    input.click();
  }

  exportNotes() {
    let tempLink = document.createElement("a");

    let notes = this.storageService.getFromLocalStorage('notesList');
    let textBlob = new Blob([JSON.stringify(notes)], {type: 'application/json'});

    tempLink.setAttribute('href', URL.createObjectURL(textBlob));
    tempLink.setAttribute('download', `notes-export_${new Date().getMilliseconds()}.json`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
