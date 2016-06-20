
import {Component} from '@angular/core';
import {Routes} from '@angular/router';
import {Location} from '@angular/common';
import {ionicBootstrap, NavParams, ViewController,Platform} from 'ionic-angular';
import {LoginPage} from "./pages/login/login";
import {LoginService} from "./pages/login/LoginService";
import {HomePage} from "./pages/home/home";
import {startQuiz} from "./pages/startQuiz/startQuiz";
import {GetGroupQuizSchedule} from "./pages/home/GetGroupQuizSchedule";
// import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from "angularfire2";


// export const firebaseRef = firebase.initializeApp(config);

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

class QuizApp {
  rootPage: any = LoginPage;
    constructor(platform: Platform, location: Location) {


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
              // StatusBar.styleDefault();
        });
    }
}
ionicBootstrap(QuizApp, [
    LoginService,
    GetGroupQuizSchedule
]);
// ionicBootstrap(QuizApp, [
//     LoginService,
//     GetGroupQuizSchedule,
//     FIREBASE_PROVIDERS,
//     defaultFirebase('https://luminous-torch-4640.firebaseio.com/'),
//     firebaseAuthConfig({
//         provider: AuthProviders.Custom,
//         method: AuthMethods.CustomToken
//   })
// ]);
