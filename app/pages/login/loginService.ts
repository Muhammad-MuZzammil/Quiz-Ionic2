import {Injectable} from "@angular/core";
@Injectable()

export class LoginService {


    FirebaseLoginUser(user) {

        localStorage.setItem('ngStorage-LoggedInUser', JSON.stringify(user.user));

        firebase.database().goOnline(); // if previously manually signed out from firebase.
        return new Promise((resolve, reject) => {
            console.log(user)
            firebase.auth().signInWithCustomToken(user.user.token).then(res => {
                console.log("sign insign in")
                resolve("sign in")
            }).catch(function(error) {
                alert("")
                // Handle Errors here.
                if (error) {
                    reject("Error!!");
                }
            });//signInWithCustomToken function end
        }) // promsie end
    }//FirebaseLoginUser function end

}//LoginService Class end
