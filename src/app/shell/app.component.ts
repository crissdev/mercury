import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mcy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly year = new Date().getFullYear();
}
