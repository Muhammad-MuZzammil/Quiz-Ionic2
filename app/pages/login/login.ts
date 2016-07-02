
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
    constructor(public _navController : NavController, public http:Http, viewCtrl: ViewController,private _loginService: LoginService){
      this.http = http;
    }

    login (email: HTMLInputElement, pass: HTMLInputElement){
          this._navController.push(HomePage);
            this.email = email.value;
            this.password = pass.value;
            let headers: Headers = new Headers();
		        headers.append('Content-Type', 'text/plain');
		        let options: RequestOptions = new RequestOptions();
		        options.headers = headers;

            this.http.post('https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify({email: this.email , password: this.password}), options)
            .subscribe((res) => {
              (res.json());
              if(res.json().statusCode !== 0) {
                this._loginService.FirebaseLoginUser(res.json()).then((res)=>{
                  this._navController.push(HomePage);

                },(error)=>{
                  console.log(error);
                })
             }

      //  if(this.email === res.json().user.email ){
       //
      //  }

			});
    }

    // onPageWillEnter() { // THERE IT IS!!!
    //   var user = <any> localStorage.getItem("ngStorage-LoggedInUser")
    //
    //   if(user) {
    //      console.log("Logged In user");
    //       //  this._navController.push(HomePage);
    //   }else {
    //       this._loginService.FirebaseLoginUser(user).then((res)=>{
    //         this._navController.push(HomePage);
    //       },(error)=>{
    //         if(error) {
    //           console.log("Firebase Authentication failed: ", error);
    //           this._navController.push(LoginPage)
    //           // userService.removeCurrentUser();
    //         }
    //       })
    //   }
    //
    //   }
  //  videoItems: Observable<any[]>;
    // constructor(public nav : NavController,public http:Http,private af:AngularFire){
    //   this.http = http;
    //   // this.videoItems=af.list('female/')
    //
    // }
    //
    // login (email: HTMLInputElement, pass: HTMLInputElement){
    //
    //         this.email = email.value;
    //         this.password = pass.value;
    //
    //       // console.log(this.email, " : " , this.password)
    //
    //   let headers: Headers = new Headers();
		// headers.append('Content-Type', 'text/plain');
    //
		// let options: RequestOptions = new RequestOptions();
		// options.headers = headers;
    //
    //   // this.http.post('https://wgco9m0sl1.execute-api.us-east-1.amazonaws.com/dev/signin',options)
    //   this.http.post('https://wgco9m0sl1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify({email: this.email , password: this.password}), options)
    //   .subscribe((res) => {
    //     (res.json());
    //     // console .log('res.json',res.json().user.token)
    //
    //     if(res.json().statusCode !== 0){
    //       localStorage.setItem('ngStorage-LoggedInUser',JSON.stringify(res.json().user))
    //       Firebase.goOnline();
    //     //  this.af.auth.login(res.json().user.token);
    //       var ref = new Firebase("https://luminous-torch-4640.firebaseio.com/")
    //       ref.authWithCustomToken(res.json().user.token).then((res)=>{
    //         console.log(res,"111111111111111111111111111111111111");
    //       })
    //       // let auth = auth(ref)
    //       // ref.auth()
    //     }
    //
    //    if(this.email === res.json().user.email ){
    //      console.log("a4arshi@yahoo.com")
    //      this.nav.push(HomePage)
    //    }
    //
		// 	});

      // this.nav.push(HomePage)
  //  }
}
