import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Book, BooksService, CategorySummary } from '../books.service';
import { createEqualityComparer } from '../utils';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private _subscriptions = new Subscription();
  private _loadedImages = new Map<HTMLImageElement, boolean>();
  // List of all categories
  readonly categories$: Observable<CategorySummary[]>;
  // Books by selected category, or all books if no category is selected
  readonly books$: Observable<Book[]>;
  // Sort options available
  sortOptiosControl = new FormControl('title-asc');
  // Dropdown with categories (for <1024px layouts)
  categoryDropdown = new FormControl('');
  // Show/hide sidebar
  showSidebar = new BehaviorSubject(true);
  // References to thumbnails to update them when they become visible in the viewport
  @ViewChildren('bookImage') thumbnails?: QueryList<ElementRef<HTMLImageElement>>;

  constructor(private booksService: BooksService, private router: Router, private route: ActivatedRoute) {
    // Retrieve the list of categories
    this.categories$ = this.booksService.getCategoriesSummary();

    // Load current category, if specified in the URL
    const category$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          this.categoryDropdown.setValue(slug, { emitEvent: false });
          return this.booksService.getCategory(slug);
        } else {
          this.categoryDropdown.setValue('', { emitEvent: false });
          return of(undefined);
        }
      }),
    );

    this._subscriptions.add(
      this.categoryDropdown.valueChanges.subscribe((slug: string) => {
        this.router.navigate(slug ? ['/categories', slug, 'books'] : ['/']);
      }),
    );

    // Listen to search events
    const searchEvent$ = fromEvent<CustomEvent<{ value: string }>>(window, 'mcy.search');

    // Load list of books taking into account all options
    this.books$ = category$.pipe(
      // Check if we need to filter by category
      switchMap(category => {
        if (category) {
          return this.booksService.getBooksByCategory(category.slug);
        }
        return this.booksService.getBooks();
      }),
      // Text search
      switchMap(books =>
        searchEvent$.pipe(
          startWith(null),
          map(event => {
            if (event === null) {
              return books;
            }
            const value = event.detail.value.toLowerCase();
            if (value.length > 0) {
              return books.filter(book => {
                return book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value);
              });
            }
            return books;
          }),
        ),
      ),
      // Sort
      switchMap(books =>
        this.sortOptiosControl.valueChanges.pipe(
          startWith(this.sortOptiosControl.value),
          debounceTime(200),
          distinctUntilChanged<string>(),
          map(value => {
            const [property, direction] = value.split('-');
            books.sort(createEqualityComparer<Book>(property as keyof Book, direction === 'asc'));
            return books;
          }),
        ),
      ),
    );

    const mql = window.matchMedia('(max-width: 1024px)');
    this._subscriptions.add(
      fromEvent(mql, 'change')
        .pipe(startWith(mql.matches))
        .subscribe(() => {
          this.showSidebar.next(!mql.matches);
        }),
    );
  }

  ngAfterViewInit() {
    // Lazy-load book image
    //
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const imageEl = entry.target as HTMLImageElement;
          if (!this._loadedImages.has(imageEl)) {
            this._loadedImages.set(imageEl, true);
            imageEl.src = imageEl.dataset.url as string;
          } else {
            // Already loaded image for imageEl
          }
        }
      }
    };
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });

    this._subscriptions.add(
      new Subscription(() => {
        observer.disconnect();
      }),
    );

    // At this point thumbnails is already set, but TypeScript does not know that :-)
    if (this.thumbnails) {
      this._subscriptions.add(
        this.thumbnails.changes.subscribe((list: QueryList<ElementRef<HTMLImageElement>>) => {
          list.forEach(ref => {
            observer.observe(ref.nativeElement);
          });
        }),
      );
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this._loadedImages.clear();
  }

  onImageLoaded(target: HTMLImageElement) {
    if (this._loadedImages.has(target)) {
      target.removeAttribute('data-url');
      target.classList.remove('lazy-load');
    }
  }
}
