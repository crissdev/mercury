import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AddCartButtonComponent } from './components/add-cart-button.component';
import { CartStatusComponent } from './components/cart-status.component';
import { RatingComponent } from './components/rating.component';
import { DbInMemoryService } from './db-in-memory.service';
import { BookComponent } from './pages/book.component';
import { CartComponent } from './pages/cart.component';
import { HomeComponent } from './pages/home.component';
import { NotFoundComponent } from './pages/not-found.component';
import { JoinPipe } from './pipes/join.pipe';
import { MapPipe } from './pipes/map.pipe';
import { AppComponent } from './shell/app.component';
import { SearchComponent } from './components/search.component';
import { MainHeaderComponent } from './components/main-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    BookComponent,
    HomeComponent,
    RatingComponent,
    JoinPipe,
    CartComponent,
    CartStatusComponent,
    AddCartButtonComponent,
    MapPipe,
    SearchComponent,
    MainHeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(DbInMemoryService, { delay: 1500 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [JoinPipe],
})
export class AppModule {}
