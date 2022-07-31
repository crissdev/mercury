import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../services/books.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'mcy-add-cart-button',
  templateUrl: './add-cart-button.component.html',
  styleUrls: ['./add-cart-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCartButtonComponent {
  @Input() book?: Book;
  @Input() quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    if (this.book) {
      this.cartService.add(this.book, this.quantity);
    }
  }
}
