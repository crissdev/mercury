import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppFeaturesService {
  private _enableSearch = new BehaviorSubject(false);
  public enableSearch$ = this._enableSearch.asObservable();

  public get enableSearch(): boolean {
    return this._enableSearch.value;
  }

  public set enableSearch(value: boolean) {
    if (this.enableSearch !== value) {
      this._enableSearch.next(value);
    }
  }
}
