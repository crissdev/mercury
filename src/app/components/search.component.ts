import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'mcy-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnDestroy {
  private _subscriptions = new Subscription();
  searchControl = new FormControl();

  @Input() set term(value: string) {
    this.searchControl.setValue(value, { emitEvent: false });
  }

  get term() {
    return this.searchControl.value;
  }

  constructor() {
    this._subscriptions.add(
      this.searchControl.valueChanges
        .pipe(
          debounceTime(200),
          map<string, string>(value => value.trim()),
          filter<string>(value => value.length > 2 || value.length === 0),
          distinctUntilChanged<string>(),
        )
        .subscribe(value => {
          const event = new CustomEvent('mcy.search', {
            bubbles: false,
            cancelable: false,
            detail: {
              value,
            },
          });
          window.dispatchEvent(event);
        }),
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
