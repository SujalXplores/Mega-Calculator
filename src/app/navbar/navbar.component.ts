import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

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

  constructor(
    private _router: Router, 
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  telegram() {
    location.href = "https://t.me/technewsupdates0";
  }

  angular() {
    location.href = "https://angular.io";
  }

  firebase() {
    location.href = "https://firebase.google.com";
  }

  bugReport() {
    location.href = "mailto:shahc9437@gmail.com?subject=Bug Report";
  }

  sslCheck() {
    location.href = "https://www.sslshopper.com/ssl-checker.html#hostname=https://megacalculator-4234.web.app";
  }

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      autoFocus: false,
      disableClose: true
    });
  }
}
