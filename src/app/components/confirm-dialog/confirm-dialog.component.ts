import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  delete: any;
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private _router: Router,
    private _auth: SocialAuthService,
    private _toast: HotToastService
  ) { }

  onConfirmExit(): void {
    this.dialogRef.close(true);
    this._auth.signOut().then().catch(e=>{
      this._toast.show("Come back soon.", {
        icon: '👋',
        position: 'bottom-center',
        theme: 'snackbar'
      })
    });
    localStorage.clear();
    this._router.navigate(['']);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}