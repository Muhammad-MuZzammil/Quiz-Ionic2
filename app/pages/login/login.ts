
import {NavController, ViewController} from 'ionic-angular';
import {Component} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {AngularFire} from 'angularfire2';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
import {CustomValidators} from "./customValidation";
import {LoginService} from "./LoginService";
@Component({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    // password;
    email: AbstractControl;
    password: AbstractControl;
    authForm: ControlGroup;
    constructor(public _navController: NavController, public http: Http, viewCtrl: ViewController, private _loginService: LoginService, private fb: FormBuilder) {
        this.http = http;

        this.authForm = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.EmailValidation])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }
    // login function start
    login() {
        if (this.authForm.valid) {
            let headers: Headers = new Headers();
            headers.append('Content-Type', 'text/plain');
            let options: RequestOptions = new RequestOptions();
            options.headers = headers;

            this.http.post('https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify(this.authForm.value), options)
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
        }// if statement end
    } // login function start
}
