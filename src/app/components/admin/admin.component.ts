import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment.prod";
import { AngularFirestore } from '@angular/fire/firestore';
import { Keygen } from './key.model';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Visitors } from 'src/app/visitors.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  value: string = '';
  user_info: Keygen[] = [];
  visitor_count: Visitors[] = [];
  count: number = 0;
  options: any[] = [
    { index: 0, value: '1 Day' },
    { index: 1, value: '1 Week' },
    { index: 2, value: '1 Month' },
    { index: 3, value: 'Lifetime' }
  ];
  selected: any = this.options[0].value;
  constructor(
    private titleService: Title, 
    private datePipe: DatePipe, 
    private _fireStore: AngularFirestore, 
    private _router: Router, 
    private toast: HotToastService
  ) {
    this.titleService.setTitle("Admin Panel");
  }

  ngOnInit(): void {
    if (localStorage.getItem("admin") == environment.key) {
      document.getElementById("overlay").style.display = "block";
    } else {
      var key = prompt("Enter Master Key");
      if (key == environment.key && key != null) {
        this.toast.success('Access Granted', {
          theme: 'snackbar',
          position: 'bottom-center'
        });
        document.getElementById("overlay").style.display = "block";
        localStorage.setItem("admin", key);
      } else {
        this.toast.error('Access Denied', {
          theme: 'snackbar',
          position: 'bottom-center'
        });
        this._router.navigate(['']);
      }
    }
    this._fireStore.collection("users").snapshotChanges().subscribe(arr => {
      this.user_info = arr.map(item => {
        return {
          id: item.payload.doc.id,
          key: item.payload.doc.data()['key'],
          expiry: item.payload.doc.data()['expiry'],
        } as Keygen;
      });
    });
    this._fireStore.collection("visitor").snapshotChanges().subscribe(arr => {
      this.visitor_count = arr.map(item => {
        return {
          id: item.payload.doc.id,
          count: item.payload.doc.data()['count']
        } as Visitors;
      });
    });
    setTimeout(() => {
      this.count = this.visitor_count[0].count;
    }, 3000);
  }

  onGenerate(): void {
    this.value = Math.random().toString(36).slice(2);
    if (this.selected == '1 Day') {
      var currentDate = new Date(+new Date() + 86400000);
    } else if (this.selected == '1 Week') {
      var currentDate = new Date(+new Date() + 86400000 * 7);
    } else if (this.selected == '1 Month') {
      var currentDate = new Date(+new Date() + 86400000 * 30);
    } else if (this.selected == 'Lifetime') {
      var currentDate = new Date(+new Date() + 86400000 * 300000);
    }

    let data = {
      "key": this.value,
      "expiry": this.datePipe.transform(currentDate.getTime())
    }
    this._fireStore.collection('users').add(data).then(() => {
      this.toast.success('Key generated', {
        theme: 'snackbar',
        position: 'bottom-center'
      });
    }).catch(e => {
      this.toast.error(e, {
        theme: 'snackbar',
        position: 'bottom-center'
      });
    });
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this._fireStore.doc('users/' + id).delete();
      this.toast.warning('Key Deleted successfully', {
        theme: 'snackbar',
        position: 'bottom-center'
      });
    }
  }
}
