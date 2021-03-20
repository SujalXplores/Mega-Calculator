import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Visitors } from 'src/app/visitors.model';
import { HotToastService } from '@ngneat/hot-toast';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { User } from '../login/user.model';
import { ViewMoreComponent } from './view-more/view-more.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user_info: User[] = [];
  visitor_count: Visitors[] = [];
  count: number = 0;
  constructor(
    private titleService: Title,
    private _fireStore: AngularFirestore,
    private toast: HotToastService,
    private dialog: MatDialog
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
        disableClose: false
      });
    }
    this._fireStore.collection("gusers").snapshotChanges().subscribe(arr => {
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

  viewMore(item: User): void {
    this.dialog.open(ViewMoreComponent, {
      width: "400px",
      height: "400px",
      autoFocus: false,
      disableClose: true,
      data: item
    });
  }
}
