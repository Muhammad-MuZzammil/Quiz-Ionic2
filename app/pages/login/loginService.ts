import {Injectable} from "@angular/core";
@Injectable()

export class LoginService {


  FirebaseLoginUser(user){

      localStorage.setItem('ngStorage-LoggedInUser',JSON.stringify(user.user));

      // Firebase.goOnline();
      firebase.database().goOnline(); // if previously manually signed out from firebase.
    //  var auth = $firebaseAuth();
      // var auth = $firebaseAuth(ref);
        // console.log('token', token)


      return new Promise((resolve, reject) => {

        firebase.auth().signInWithCustomToken(user.user.token).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          if(error) {
            console.log({errorCode: errorCode, errorMessage: errorMessage});
            reject({errorCode: errorCode, errorMessage: errorMessage});
          }
          else {
            resolve("sign in")
          }
});
      })
  }

}
