import {Page  , NavController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {Http ,Headers ,RequestOptions} from '@angular/http';

import {HomePage} from '../home/home'
// import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  email;
  password;
  //  videoItems: Observable<any[]>;
    constructor(public nav : NavController,public http:Http){
      this.http = http;
      // this.videoItems=af.list('female/')
            
    }
    
    login (email: HTMLInputElement, pass: HTMLInputElement){
    
            this.email = email.value;
            this.password = pass.value;
 
          // console.log(this.email, " : " , this.password)
 
      let headers: Headers = new Headers();
		headers.append('Content-Type', 'text/plain');

		let options: RequestOptions = new RequestOptions();
		options.headers = headers;
    
      // this.http.post('https://wgco9m0sl1.execute-api.us-east-1.amazonaws.com/dev/signin',options)
      this.http.post('https://wgco9m0sl1.execute-api.us-east-1.amazonaws.com/dev/signin', JSON.stringify({email: this.email , password: this.password}), options)
      .subscribe((res) => {	
        (res.json());
        // console.log("MANI",this.email)
        
       if(this.email === res.json().user.email ){
         console.log("a4arshi@yahoo.com")
         this.nav.push(HomePage)
       }
            	
			});
 
      // this.nav.push(HomePage)
    }
}
