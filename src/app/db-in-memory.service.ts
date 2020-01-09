import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import db from './db.json';

export interface DbBook {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  author: string;
  rating: number;
  description: string;
  categories: number[];
  price: number;
}

export interface DbCategory {
  id: number;
  name: string;
  slug: string;
}

export interface DbSchema {
  books: DbBook[];
  categories: DbCategory[];
}

@Injectable({
  providedIn: 'root',
})
export class DbInMemoryService implements InMemoryDbService {
  constructor() {}

  createDb(reqInfo?: RequestInfo) {
    return Promise.resolve(db);
  }
}
