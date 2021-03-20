import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private _auth: SocialAuthService
  ) { }

  onConfirmExit(): void {
    this.dialogRef.close(true);
    this._auth.signOut().then().catch(e=>{console.log("Logged Out")});
    localStorage.clear();
    this._router.navigate(['']);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}