import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: SocialUser;
  user_info: User[] = [];
  private unsubscribe = new Subject();
  is_exist: any;
  is_disabled: boolean = false;
  constructor(
    private titleService: Title,
    private _fireStore: AngularFirestore,
    private _router: Router,
    private toast: HotToastService,
    private auth: SocialAuthService
  ) {
    this.titleService.setTitle("Login");
  }

  ngOnInit(): void {
    this._fireStore.collection("gusers").snapshotChanges().pipe(takeUntil(this.unsubscribe)).subscribe(arr => {
      this.user_info = arr.map(item => {
        return {
          id: item.payload.doc.id,
          guid: item.payload.doc.data()['guid'],
          name: item.payload.doc.data()['name'],
          photoUrl: item.payload.doc.data()['photoUrl']
        } as User;
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onGoogleSignIn(): void {
    this.is_disabled = true;
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.auth.authState.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
        this.user = user;
        if (user != null) {
          this.is_exist = this.user_info.find(({ guid }) => guid == user.id);
          if (this.is_exist) {
            localStorage.setItem('id', user.id);
            localStorage.setItem('photoUrl', user.photoUrl);
            localStorage.setItem('name', user.name);
            this._router.navigate(['/nav/cuboid']);
            this.toast.show("Welcome Aboard " + user.firstName, {
              theme: 'snackbar',
              id: 'welcome',
              icon: '😄',
              position: 'bottom-center'
            });
          } else {
            const udata = {
              "guid": this.user.id,
              "name": this.user.name,
              "email": this.user.email,
              "photoUrl": this.user.photoUrl,
              "isPremium": false
            };
            this._fireStore.collection('gusers').add(udata).then(() => {
              localStorage.setItem('id', user.id);
              localStorage.setItem('photoUrl', user.photoUrl);
              localStorage.setItem('name', user.name);
              this._router.navigate(['/nav/cuboid']);
              this.toast.show("Welcome Aboard " + user.firstName, {
                theme: 'snackbar',
                id: 'welcome',
                icon: '😄',
                position: 'bottom-center'
              });
            }).catch(() => {
              this.is_disabled = false;
              this.toast.warning("Something went wrong !", {
                id: 'wrong',
                theme: 'snackbar',
                position: 'bottom-center'
              });
            });
          }
        }
      });
    }, () => {
      this.is_disabled = false;
      this.toast.warning("Login window closed !", {
        id: 'closed',
        theme: 'snackbar',
        position: 'bottom-center'
      });
    });
  }
}
