import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {NotesService} from "../services/notes.service";
import Note from "../models/Note";
import {
  faCirclePlus,
  faFileArrowUp,
  faFileCirclePlus,
  faFileExport
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

    this.notes = [
      new Note("1",
        'First note',
        'Eget felis graeci nec sadipscing conceptam consectetuer vulputate. Ea expetendis purus ocurreret vocent tota discere indoctum. Vel orci quaerendum explicari penatibus melius deserunt dicunt.'
      ),
      new Note("2",
        'Second note',
        'Metus risus repudiandae ad ultricies gubergren fuisset mucius volutpat. Mollis lacus reformidans suspendisse offendit instructior tractatos habitant veritus ridens. Suscipit vix praesent accumsan erroribus inimicus sollicitudin noster nec delicata. Appareat gloriatur mollis antiopam dico alterum graeci. Iudicabit posse nisi laoreet fabellas leo tincidunt mattis dolorum.'
      ),
      new Note("3",
        'Third note',
        'Omnesque his quot qualisque urbanitas reque regione.'
      ),
      new Note("3",
        'Third note',
        'Third note content'
      ),
      new Note("3",
        'Third note',
        'Netus non menandri dignissim eius. Montes signiferumque mel ludus invenire cubilia dapibus pretium. Quo sociosqu mus eos percipit minim.'
      ),
      new Note("3",
        'Third note',
        'Third note content'
      ),
      new Note("3",
        'Third note',
        'Third note content'
      ),
      new Note("3",
        'Third note',
        'Lobortis iudicabit posuere expetendis elementum varius. Vivendo no tincidunt posidonium elementum qui luctus delicata iudicabit. Vituperata posidonium numquam an efficiantur tempus noster. Etiam eros ancillae pro hac nec ad. Viverra ultrices wisi quot decore omnesque usu ignota quot.'
      ),
      new Note("3",
        'Third note',
        'Third note content'
      ),
    ]

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
        console.log("updating")
        this.notes[ notesData.position ].setTitle( notesData.data.title );
        this.notes[ notesData.position ].setContent( notesData.data.content );
        this.notes[ notesData.position ].update();

        this.storageService.setIntoLocalStorage('notesList', this.notes)
      },
      ( err ) => {
        console.error( err )
      }
    )

    this.subscriptions.add( screenSubscription );
    this.subscriptions.add( notesSubscription );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addNote() {

  }

  export() {

  }
}
