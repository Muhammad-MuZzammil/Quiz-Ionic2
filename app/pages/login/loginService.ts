import {Injectable} from "@angular/core";
@Injectable()

export class LoginService {


    FirebaseLoginUser(user) {

        localStorage.setItem('ngStorage-LoggedInUser', JSON.stringify(user.user));

        firebase.database().goOnline(); // if previously manually signed out from firebase.
        return new Promise((resolve, reject) => {

            firebase.auth().signInWithCustomToken(user.user.token).catch(function(error) {
                // Handle Errors here.
                if (error) {
                    reject("Error!!");
                }
                else {
                    resolve("sign in")
                }
            });//signInWithCustomToken function end
        }) // promsie end
    }//FirebaseLoginUser function end

}//LoginService Class end
