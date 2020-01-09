import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book.component';
import { CartComponent } from './pages/cart.component';
import { HomeComponent } from './pages/home.component';
import { NotFoundComponent } from './pages/not-found.component';
import { AppFeaturesGuard } from './services/app-features.guard';

const routes: Routes = [
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent,
    canActivate: [AppFeaturesGuard],
  },
  {
    path: 'books/:slug',
    component: BookComponent,
    canActivate: [AppFeaturesGuard],
  },
  {
    path: 'categories/:slug/books',
    component: HomeComponent,
    canActivate: [AppFeaturesGuard],
    data: {
      search: true,
    },
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AppFeaturesGuard],
    data: {
      search: true,
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
    canActivate: [AppFeaturesGuard],
  },
  {
    path: '**',
    redirectTo: '404',
    canActivate: [AppFeaturesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
