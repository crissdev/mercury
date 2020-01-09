import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppFeaturesService } from '../services/app-features.service';
import { SearchComponent } from './search.component';

@Component({
  selector: 'mcy-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent implements OnDestroy {
  private _subscriptions = new Subscription();
  enableSearch$: Observable<boolean>;
  @ViewChild(SearchComponent, { static: false }) searchComponent?: SearchComponent;

  constructor(private router: Router, private appFeatures: AppFeaturesService) {
    this.enableSearch$ = this.appFeatures.enableSearch$;
    this._subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if (this.searchComponent) {
          this.searchComponent.term = '';
        }
      }),
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
