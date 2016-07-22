
import {NavController} from 'ionic-angular';
import {Component} from "@angular/core";
//import {AngularFire} from 'angularfire2';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
import {LoginService} from "./LoginService";
import {LoginFormComponent} from "./loginForm.component";
import {HttpService} from "./../services/httpService";

@Component({
    templateUrl: 'build/pages/login/login.html',
    directives: [LoginFormComponent]
})
export class LoginPage {
    constructor(public _navController: NavController, public http: Http, private _loginService: LoginService,private _httpService : HttpService) { }
    // login function start
    login(UserCredentials) {
        let body = JSON.stringify(UserCredentials);
        console.log(UserCredentials,"UserCredentials")
        let url = "https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/signin";
        this._httpService.httpPost(url, body) // call httpService httpPost method 
            .subscribe((res) => {
                console.log(res);
                 if (res.statusCode !== 0) {
                    this._loginService.FirebaseLoginUser(res).then((res) => {
                        this._navController.push(HomePage);
                    }, (error) => {
                        console.log(error);
                    })
                }// if statement end inside subscribe
            });// subscribe function end
    } // login function start
}
