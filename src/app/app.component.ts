import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mega Calculator';
  constructor(private _toast: HotToastService) {}

  ngOnInit() {
    addEventListener('offline', () => {
      this._toast.warning("You're currently offline !", {
        id: 'online',
        position: 'bottom-center',
        theme: 'snackbar'
      });
    });
    addEventListener('online', () => {
      this._toast.success("You're online now", {
        id: 'online',
        position: 'bottom-center',
        theme: 'snackbar'
      });
    });
  }
}
