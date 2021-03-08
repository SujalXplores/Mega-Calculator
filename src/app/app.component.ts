import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Visitors } from './visitors.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mega Calculator';
  visitor: Visitors[] = [];
  count: any = {};
  constructor(private _fireStore: AngularFirestore) {
    this._fireStore.collection("visitor").auditTrail().subscribe(arr => {
      this.visitor = arr.map(item => {
        return {
          id: item.payload.doc.id,
          count: item.payload.doc.data()["count"]
        } as Visitors;
      });
      this.count = {
        "count": this.visitor[0].count + 1
      }
      this._fireStore.doc('visitor/EToMtvvdSufPPk1BGnIo').update(this.count);
    });
  }
}
