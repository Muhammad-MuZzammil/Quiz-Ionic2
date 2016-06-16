import {Injectable} from "@angular/core";
@Injectable()

export class LoginService {


  FirebaseLoginUser(user){
    localStorage.setItem('ngStorage-LoggedInUser',JSON.stringify(user.user));
    Firebase.goOnline();
    var ref = new Firebase("https://luminous-torch-4640.firebaseio.com/");

    return new Promise((resolve, reject) => {ref.authWithCustomToken(user.user.token)
      .then((res)=>{
       resolve(res)
      })
    })
  }

}
