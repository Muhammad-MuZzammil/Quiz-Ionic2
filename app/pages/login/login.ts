import {NavController,ViewController} from 'ionic-angular';
import {Component} from "@angular/core";
import {AngularFire} from 'angularfire2';
import {Http ,Headers ,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
import {LoginService} from "./LoginService";
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  email;
  password;
    constructor(public _navController : NavController,public http:Http,private af:AngularFire,viewCtrl: ViewController,private _loginService: LoginService){
      this.http = http;
        console.log(2)
    }

    login (email: HTMLInputElement, pass: HTMLInputElement){
          this._navController.push(HomePage);
            this.email = email.value;
            this.password = pass.value;
            let headers: Headers = new Headers();
		        headers.append('Content-Type', 'text/plain');
		        let options: RequestOptions = new RequestOptions();
		        options.headers = headers;

            this.http.post('https://wgco9m0sl1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify({email: this.email , password: this.password}), options)
            .subscribe((res) => {
              (res.json());
              if(res.json().statusCode !== 0) {
                this._loginService.FirebaseLoginUser(res.json()).then((res)=>{
                  this._navController.push(HomePage);
                })
             }

      //  if(this.email === res.json().user.email ){
       //
      //  }

			});
    }
    onPageWillEnter() { // THERE IT IS!!!
      var user = <any> localStorage.getItem("ngStorage-LoggedInUser")

      if(user) {
         console.log("Logged In user");
          //  this._navController.push(HomePage);
      }else {
          this._loginService.FirebaseLoginUser(user).then((res)=>{
            this._navController.push(HomePage);
          },(error)=>{
            if(error) {
              console.log("Firebase Authentication failed: ", error);
              this._navController.push(LoginPage)
              // userService.removeCurrentUser();
            }
          })
      }

      }
}
