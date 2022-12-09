import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Note from "../../models/Note";
import {faCircleCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {StorageService} from "../../../../services/storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {

  @Input('note') note: Note = new Note();
  @Output('closeForm') closeForm = new EventEmitter<{ state: boolean, data: Note | null }>();
  checkIcon = faCircleCheck;
  cancelIcon = faTimes;

  noteForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {

    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this.noteForm.setValue({
      title: this.note.title,
      content: this.note.content
    });
  }

  saveNote() {
    this.closeForm.emit( { state: true, data: this.noteForm.value } );
  }

  cancelNote() {
    this.closeForm.emit( { state: false, data: null } );
  }

}
