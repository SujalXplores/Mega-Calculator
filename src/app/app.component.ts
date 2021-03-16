import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { Visitors } from './visitors.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mega Calculator';
  visitor: Visitors[] = [];
  count: any = {};
  constructor(private _fireStore: AngularFirestore, private _toast: HotToastService) {
    this._fireStore.collection("visitor").snapshotChanges().subscribe(arr => {
      this.visitor = arr.map(item => {
        return {
          id: item.payload.doc.id,
          count: item.payload.doc.data()["count"]
        } as Visitors;
      });
    });
    setTimeout(() => {
      this.count = { "count": this.visitor[0].count + 1 }
      this._fireStore.doc('visitor/EToMtvvdSufPPk1BGnIo').update(this.count);
    }, 3000);
  }

  ngOnInit() {
    addEventListener('offline', (e) => {
      this._toast.warning("You're currently offline !", {
        id: 'online',
        position: 'bottom-center',
        theme: 'snackbar'
      });
    });
    addEventListener('online', (e) => {
      this._toast.success("You're online now", {
        id: 'online',
        position: 'bottom-center',
        theme: 'snackbar'
      });
    });
  }
}
