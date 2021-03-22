import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { User } from '../login/user.model';
import { ViewMoreComponent } from './view-more/view-more.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user_info: User[] = [];
  private unsubscribe = new Subject();
  constructor(
    private titleService: Title,
    private _fireStore: AngularFirestore,
    private dialog: MatDialog,
    private _toast: HotToastService
  ) {
    this.titleService.setTitle("Admin Panel");
  }

  ngOnInit(): void {
    if (localStorage.getItem("admin") == environment.key) {
      document.getElementById("overlay").style.display = "block";
    } else {
      this.dialog.open(PasswordDialogComponent, {
        width: "300px",
        autoFocus: true,
        disableClose: true
      });
    }
    this._fireStore.collection("gusers").snapshotChanges().pipe(takeUntil(this.unsubscribe)).subscribe(arr => {
      this.user_info = arr.map(item => {
        return {
          id: item.payload.doc.id,
          guid: item.payload.doc.data()['guid'],
          name: item.payload.doc.data()['name'],
          photoUrl: item.payload.doc.data()['photoUrl'],
          email: item.payload.doc.data()['email'],
          isPremium: item.payload.doc.data()['isPremium']
        } as User;
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onDelete(id: string): void {
    const p = prompt("Are you sure you want to delete?");
    if(p) {
      this._fireStore.collection("gusers").doc(id).delete().then(()=>{
        this._toast.success("Record Deleted !", {
            theme: 'snackbar',
            position: 'bottom-center',
            id: 'delete'
        });
      });
    }
  }

  viewMore(item: User): void {
    this.dialog.open(ViewMoreComponent, {
      width: "400px",
      autoFocus: false,
      disableClose: true,
      data: item
    });
  }
}