import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private _router: Router
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
    localStorage.clear();
    this._router.navigate(['']);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}