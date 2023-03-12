import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Note from "../pages/notes/models/Note";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private updateStorage = new BehaviorSubject<any | undefined>(undefined);
  updateStorage$: Observable<boolean | undefined> = this.updateStorage.asObservable();

  constructor() { }

  setIntoLocalStorage( key: string, value: any ){
    localStorage.setItem( key, JSON.stringify( value ) );
    this.updateStorage.next( this.getFromLocalStorage( key ) );
  }

  removeFromLocalStorage( key: string ){
    localStorage.removeItem( key );
    this.updateStorage.next( this.getFromLocalStorage( key ) );
  }

  getFromLocalStorage( key: string ){
    let data = localStorage.getItem( key );
    if ( data ) return JSON.parse( data );
    return undefined;
  }
}
