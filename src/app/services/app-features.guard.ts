import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppFeaturesService } from './app-features.service';

@Injectable({
  providedIn: 'root',
})
export class AppFeaturesGuard implements CanActivate, CanActivateChild {
  constructor(private appFeatures: AppFeaturesService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.appFeatures.enableSearch = !!next.data.search;
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.appFeatures.enableSearch = !!next.data.search;
    return true;
  }
}
