import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Keygen } from '../admin/key.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_info: Keygen[] = [];
  hide: boolean = true;
  eye: string = '../../../assets/eve_close.svg';
  constructor(
    private titleService: Title,
    private datePipe: DatePipe,
    private _fireStore: AngularFirestore,
    private _router: Router,
    private toast: HotToastService
  ) {
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
        this.toast.show("Welcome Aboard Sir", {
          theme: 'snackbar',
          icon: '😄',
          position: 'bottom-center'
        });
        localStorage.setItem("pass", expiry.key);
        this._router.navigate(['/nav/cuboid']);
      } else {
        this.toast.warning('This Key is expired !', {
          id: 'pause',
          theme: 'snackbar',
          position: 'bottom-center'
        });
      }
    } else {
      this.toast.warning('Wrong key !', {
        id: 'pause',
        theme: 'snackbar',
        position: 'bottom-center'
      });
    }
  }

  onShow() {
    if (this.hide) {
      this.eye = '../../../assets/eye.svg';
    } else {
      this.eye = '../../../assets/eve_close.svg';
    }
  }
}
