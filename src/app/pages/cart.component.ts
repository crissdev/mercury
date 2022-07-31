import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Book } from '../services/books.service';

@Component({
  selector: 'mcy-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  readonly cartItems$: Observable<CartItem[]>;
  readonly totalPrice$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.contentsChange$;
    this.totalPrice$ = this.cartService.totalPriceChange$;
  }

  ngOnInit() {}

  removeFromCart(item: CartItem) {
    this.cartService.remove(item);
  }

  updateQuantity(book: Book, qty: string) {
    this.cartService.updateQuantity(book, Number(qty));
  }
}
