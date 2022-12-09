import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private updateStorage = new BehaviorSubject<any | undefined>(undefined);
  updateStorage$: Observable<boolean | undefined> = this.updateStorage.asObservable();

  constructor() { }

  setIntoLocalStorage( key: string, value: any ){
    localStorage.setItem( key, value );
    this.updateStorage.next( this.getFromLocalStorage( key ) );
  }

  removeFromLocalStorage( key: string ){
    localStorage.removeItem( key );
    this.updateStorage.next( this.getFromLocalStorage( key ) );
  }

  getFromLocalStorage( key: string ){
    return localStorage.getItem( key )
  }
}
