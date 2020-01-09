import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book, BooksService } from '../books.service';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  readonly book$: Observable<Book | undefined>;
  showPlayer = false;
  @ViewChild('mediaEl', { static: false }) mediaEl?: ElementRef<HTMLVideoElement>;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const slug = params.get('slug');

        if (slug) {
          return this.booksService.getBook(slug);
        } else {
          this.router.navigate(['404']);
          return of(undefined);
        }
      }),
    );
  }

  playReview() {
    this.showPlayer = true;
    this.cdRef.detectChanges();
    if (this.mediaEl) {
      this.mediaEl.nativeElement.play();
    }
  }
}
