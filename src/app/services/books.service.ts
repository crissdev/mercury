import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '@environment';
import { DbBook, DbCategory } from './db-in-memory.service';
import { createEqualityComparer } from './utils';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Book {
  id: number;
  title: string;
  slug: string;
  buyUrl: string;
  imageUrl: string;
  audioUrl: string;
  author: string;
  rating: number;
  audibleUrl: string;
  description: string;
  categories: Category[];
  price: number;
}

export interface CategorySummary {
  name: string;
  slug: string;
  // Number of books in category
  count: number;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  private categoriesCache$?: Observable<Category[]>;
  private booksCache$?: Observable<Book[]>;
  private summaryCache$?: Observable<CategorySummary[]>;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http.get<DbCategory[]>(`${environment.apiUrl}/categories`).pipe(
        map(data => (data as Category[]).sort(createEqualityComparer('name'))),
        shareReplay(1),
      );
    }
    return this.categoriesCache$;
  }

  getCategory(slug: string): Observable<Category | undefined> {
    return this.getCategories().pipe(
      map(categories => {
        return categories.find(category => category.slug === slug);
      }),
    );
  }

  getBooks(): Observable<Book[]> {
    if (!this.booksCache$) {
      this.booksCache$ = forkJoin([this.http.get<DbBook[]>(`${environment.apiUrl}/books`), this.getCategories()]).pipe(
        map(([data, categories]) => {
          // Create a map for faster lookups
          const categoriesMap = new Map<number, Category>();
          for (const category of categories) {
            categoriesMap.set(category.id, category);
          }

          return data
            .map(dataItem => {
              return {
                ...dataItem,
                price: Math.random() * 100,
                categories: dataItem.categories.map(id => categoriesMap.get(id)),
              } as Book;
            })
            .sort(createEqualityComparer('rating', false));
        }),
        shareReplay(1),
      );
    }
    return this.booksCache$;
  }

  getBooksByCategory(categorySlug: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => {
        return books
          .filter(book => book.categories.find(category => category.slug === categorySlug))
          .sort(createEqualityComparer('rating', false));
      }),
    );
  }

  getCategoriesSummary(): Observable<CategorySummary[]> {
    if (!this.summaryCache$) {
      this.summaryCache$ = this.getBooks().pipe(
        map(books => {
          const booksMap = new Map<string, { count: number; slug: string }>();
          const result: CategorySummary[] = [];

          for (const book of books) {
            for (const { name, slug } of book.categories) {
              const pair = booksMap.get(name);
              const count = pair ? pair.count : 0;
              booksMap.set(name, { count: count + 1, slug });
            }
          }
          booksMap.forEach(({ count, slug }, name) => {
            result.push({ slug, name, count });
          });
          return result.sort(createEqualityComparer('name'));
        }),
      );
    }
    return this.summaryCache$;
  }

  getBook(slug: string): Observable<Book | undefined> {
    return this.getBooks().pipe(map(books => books.find(book => book.slug === slug)));
  }
}
