
import {Component} from '@angular/core';
import {ionicBootstrap,Platform} from 'ionic-angular';
import {LoginPage} from "./pages/login/login";
import {LoginService} from "./pages/login/LoginService";
import {HomePage} from "./pages/home/home";
import {startQuiz} from "./pages/startQuiz/startQuiz";
import {GetGroupQuizSchedule} from "./pages/home/GetGroupQuizSchedule";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

class QuizApp {
  rootPage: any = LoginPage;
    constructor(platform: Platform) {


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
