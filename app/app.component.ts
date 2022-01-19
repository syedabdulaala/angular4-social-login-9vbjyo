import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//  var config = {
//     apiKey: "AIzaSyAVh7JT31mSKgitX9f56dc20tvIMW5daQ0",
//     authDomain: "angular4-social-login.firebaseapp.com",
//     databaseURL: "https://angular4-social-login.firebaseio.com",
//     projectId: "angular4-social-login",
//     storageBucket: "angular4-social-login.appspot.com",
//     messagingSenderId: "463867141767"
//   };

//   firebase.initializeApp(config);

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 4';

  user: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth){
    this.user = this.afAuth.authState
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(function (error){
      alert('${error.message} Please try again')
    })
  }

  // loginFacebook() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //   .catch(function (error){
  //     alert('${error.message} Please try again')
  //   })
  // }

  logout() {
    this.afAuth.auth.signOut();
  }
  
}
