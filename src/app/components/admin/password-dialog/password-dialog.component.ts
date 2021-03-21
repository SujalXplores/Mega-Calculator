import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public key: string,
    private toast: HotToastService,
    private _router: Router
  ) { }

  onConfirm(): void {
    if (this.key == environment.key && this.key != null) {
      this.toast.success('Access Granted', {
        theme: 'snackbar',
        position: 'bottom-center'
      });
      document.getElementById("overlay").style.display = "block";
      localStorage.setItem("admin", this.key);
    } else {
      this._router.navigate(['/nav/cuboid']);
      this.toast.warning('Access Denied', {
        theme: 'snackbar',
        position: 'bottom-center'
      });
    }
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this._router.navigate(['/nav/cuboid']);
    this.dialogRef.close(false);
  }
}
