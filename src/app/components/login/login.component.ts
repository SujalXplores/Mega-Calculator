import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Keygen } from '../admin/key.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_info: Keygen[] = [];
  constructor(private datePipe: DatePipe,private _fireStore: AngularFirestore, private _router: Router, private _snackbar: MatSnackBar) { }
  ngOnInit(): void {
    var currentDate = new Date(+new Date()).getTime();
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
    var d1 = this.datePipe.transform(currentDate.getTime());
    const filter1 = this.user_info.find(({key}) => key == k);
    if(filter1 != undefined) {
      if(filter1.expiry >= d1){
        localStorage.setItem("pass", filter1.key);
        this._router.navigate(['/nav/cuboid']);
      } else {
        this._snackbar.open("Key is deleted or expired!", "x", {
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
