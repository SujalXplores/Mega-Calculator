import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
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
  profile: string = '';
  name: string = '';
  counter: number = 0;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private _router: Router
  ) { 
    this.profile = localStorage.getItem('photoUrl');
    this.name = localStorage.getItem('name');
  }

  telegram(): void {
    location.href = "https://t.me/technewsupdates0";
  }

  bugReport(): void {
    location.href = "mailto:shahc9437@gmail.com?subject=Bug Report";
  }

  onLogout(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      autoFocus: false,
      disableClose: true
    });
  }

  onDashboard(): void {
    this.counter += 1;
    if(this.counter>=7) {
      this.counter = 0;
      this._router.navigate(['/nav/admin']);
    }
  }
}
