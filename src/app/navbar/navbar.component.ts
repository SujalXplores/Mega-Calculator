import { Component, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private _router: Router, private breakpointObserver: BreakpointObserver) { }

  telegram() {
    location.href = "https://t.me/technewsupdates0";
  }

  onLogout() {
    var r = confirm("Are you sure to Logout?");
    if(r==true) {
      localStorage.clear();
      this._router.navigate(['']);
    }
  }
}
