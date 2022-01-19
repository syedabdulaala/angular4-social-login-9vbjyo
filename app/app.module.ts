import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Social Login imports
// import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login"

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("Facebook-App-Id")
//   }
// ]);

  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAVh7JT31mSKgitX9f56dc20tvIMW5daQ0",
    authDomain: "angular4-social-login.firebaseapp.com",
    databaseURL: "https://angular4-social-login.firebaseio.com",
    projectId: "angular4-social-login",
    storageBucket: "angular4-social-login.appspot.com",
    messagingSenderId: "463867141767"
  };

  //firebase.initializeApp(config);


@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig) ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

  

 }
