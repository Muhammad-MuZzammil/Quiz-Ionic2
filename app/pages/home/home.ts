import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {ResultPage} from '../result/result';
@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private _navController: NavController) {
  }
  results(){

         this._navController.push(ResultPage)


  }
  /*
    pushPage(){
      this._navController.push(SomeImportedPage, { userId: "12345"});
    }
  */
}
