import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'mcy-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartStatusComponent {
  cartMessage$: Observable<string>;

  constructor(private cartService: CartService, private currencyPipe: CurrencyPipe) {
    this.cartMessage$ = this.cartService.contentsChange$.pipe(
      map(items => {
        if (items.length === 0) {
          return '';
        } else {
          const formattedTotal = this.currencyPipe.transform(
            this.cartService.totalPrice,
            'USD',
            'symbol',
            '1.2-2',
            'en-US',
          );
          return `${items.length} product${items.length > 1 ? 's' : ''} – ${formattedTotal}`;
        }
      }),
    );
  }
}
