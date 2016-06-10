import {Page  , NavController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {Http ,Headers ,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable'
import {HomePage} from '../home/home'
// import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  email;
  password;
  //  videoItems: Observable<any[]>;
    constructor(public nav : NavController,public http:Http,private af:AngularFire){
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
        console .log('res.json',res.json())
        // console .log('res.json',res.json().user.token)
        
        if(res.json().statusCode !== 0){
          localStorage.setItem('ngStorage-LoggedInUser',JSON.stringify(res.json().user))
          Firebase.goOnline();
        //  this.af.auth.login(res.json().user.token);
          var ref= new Firebase("https://luminous-torch-4640.firebaseio.com/")
          ref.authWithCustomToken(res.json().user.token).then((res)=>{
            console.log(res);
          })
          // let auth = auth(ref)
          // ref.auth()
        }
        
       if(this.email === res.json().user.email ){
         console.log("a4arshi@yahoo.com")
         this.nav.push(HomePage)
       }
            	
			});
 
      // this.nav.push(HomePage)
    }
}
