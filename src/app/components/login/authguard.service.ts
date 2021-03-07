import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(private _router: Router) { }
  canActivate(_active: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('pass') != null) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }
}
