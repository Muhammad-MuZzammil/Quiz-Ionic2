
import {NavController, ViewController} from 'ionic-angular';
import {Component} from "@angular/core";
import {AngularFire} from 'angularfire2';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
import {LoginService} from "./LoginService";
import {LoginFormComponent} from "./loginForm.component";

@Component({
    templateUrl: 'build/pages/login/login.html',
    directives:[LoginFormComponent]
})
export class LoginPage {
    constructor(public _navController: NavController, public http: Http, viewCtrl: ViewController, private _loginService: LoginService) {
        this.http = http;

    }
    // login function start
    login(UserCredentials) {
            let headers: Headers = new Headers();
            headers.append('Content-Type', 'text/plain');
            let options: RequestOptions = new RequestOptions();
            options.headers = headers;

            this.http.post('https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify(UserCredentials), options)
                .subscribe((res) => {
                    (res.json());
                    if (res.json().statusCode !== 0) {
                        this._loginService.FirebaseLoginUser(res.json()).then((res) => {
                            this._navController.push(HomePage);
                        }, (error) => {
                            console.log(error);
                        })
                    }// if statement end inside subscribe
                });// subscribe end
    } // login function start
}
