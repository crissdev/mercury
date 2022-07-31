import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './books.service';

export interface CartItem {
  book: Book;
  quantity: number;
}

const computePrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
};

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private _cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  contentsChange$ = this._cartItemsSubject.asObservable();
  totalPriceChange$: Observable<number>;

  constructor() {
    this.totalPriceChange$ = this._cartItemsSubject.pipe(map(items => computePrice(items)));
  }

  add(book: Book, quantity = 1) {
    console.assert(quantity > 0);

    const cartItems = this._cartItemsSubject.value;
    const foundItem = cartItems.find(item => item.book === book);
    const newArray = Array.from(cartItems);

    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      newArray.push({ book, quantity });
    }
    this._cartItemsSubject.next(newArray);
  }

  updateQuantity(book: Book, quantity: number) {
    console.assert(quantity > 0);

    const cartItems = this._cartItemsSubject.value;
    const foundItem = cartItems.find(item => item.book === book);

    if (foundItem) {
      foundItem.quantity = quantity;
      const newArray = Array.from(cartItems);
      this._cartItemsSubject.next(newArray);
    } else {
      throw new Error('The book is not in the cart');
    }
  }

  remove(item: CartItem) {
    const currentItems = this._cartItemsSubject.value;
    const index = currentItems.indexOf(item);
    if (index > -1) {
      const newArray = [];
      for (let i = 0; i < currentItems.length; i++) {
        if (index !== i) {
          newArray.push(currentItems[i]);
        }
      }
      this._cartItemsSubject.next(newArray);
    }
  }

  empty() {
    this._cartItemsSubject.next([]);
  }

  get contents(): CartItem[] {
    return this._cartItemsSubject.value;
  }

  get totalPrice(): number {
    return computePrice(this._cartItemsSubject.value);
  }

  ngOnDestroy() {
    this._cartItemsSubject.complete();
  }
}
