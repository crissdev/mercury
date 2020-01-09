import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mcy-rating',
  template: `
    <div class="rating r{{ rating }}"></div>
  `,
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  @Input() rating = 0;
}
