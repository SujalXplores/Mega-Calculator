import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Keygen } from '../admin/key.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_info: Keygen[] = [];
  constructor(private titleService: Title, private datePipe: DatePipe, private _fireStore: AngularFirestore, private _router: Router, private _snackbar: MatSnackBar) {
    this.titleService.setTitle("Login");
  }
  ngOnInit(): void {
    this._fireStore.collection("users").snapshotChanges().subscribe(arr => {
      this.user_info = arr.map(item => {
        return {
          id: item.payload.doc.id,
          key: item.payload.doc.data()['key'],
          expiry: item.payload.doc.data()['expiry'],
        } as Keygen;
      });
    });
  }

  onLogin(k: any) {
    var currentDate = new Date();
    var today = this.datePipe.transform(currentDate.getTime());
    var expiry = this.user_info.find(({ key }) => key == k);
    if (expiry != undefined) {
      var dateCur = new Date(today);
      var keyDate = new Date(expiry.expiry);
      if (keyDate >= dateCur) {
        setTimeout(() => {
          localStorage.setItem("pass", expiry.key);
          this._router.navigate(['/nav/cuboid']);
        }, 5000);
      } else {
        this._snackbar.open("Key is expired or deleted!", "x", {
          duration: 3000,
        });
      }
    } else {
      this._snackbar.open("Wrong key!", "x", {
        duration: 3000,
      });
    }
  }
}
