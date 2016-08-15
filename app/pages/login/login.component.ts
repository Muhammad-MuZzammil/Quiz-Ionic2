
import {NavController, LoadingController} from 'ionic-angular';
import {Component} from "@angular/core";
//import {AngularFire} from 'angularfire2';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
import {LoginService} from "./LoginService";
import {LoginFormComponent} from "./loginForm.component";
import {HttpService} from "./../services/httpService";
import {GroupQuizService } from "./../services/getUserGroupQuiz";
import {tot} from "./../../app";
@Component({
    templateUrl: 'build/pages/login/login.html',
    directives: [LoginFormComponent]
})
export class LoginPage {
    error: string;
    constructor(public loading: LoadingController, public _navController: NavController, public http: Http, private _loginService: LoginService, private _httpService: HttpService, private _groupQuizService: GroupQuizService) { }
    // login function start
    login(UserCredentials) {
        let loading = this.loading.create({
            content: 'Please wait...'
        })
        loading.present(loading);
        let body = JSON.stringify(UserCredentials);
        let url = `${tot + "signin"}`;
        this._httpService.httpPost(url, body) // call httpService httpPost method 
            .subscribe((res) => {
                if (res.statusCode !== 0) {
                    this._groupQuizService.saveCurrentUserName(res.user);
                    this._loginService.FirebaseLoginUser(res).then((res) => {
                        loading.dismiss();
                        this._navController.push(HomePage);
                    }, (error) => {
                        console.log(error);
                        loading.dismiss();
                    })
                }// if statement end inside subscribe
                else {
                    if (res.statusDesc === "user with this email does not exist.") {
                        this.error = "user with this email does not exist.";
                        loading.dismiss();
                    } else if (res.statusDesc == "invalid password.") {
                        this.error = "invalid password.";
                        loading.dismiss();
                    }
                }
            }, (err) => {
                console.log("Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", err);
                loading.dismiss();
            });// subscribe function end
    } // login function start
}
