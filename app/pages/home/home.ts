import {Page,NavController } from 'ionic-angular';
// import {AngularFire} from 'angularfire2';


// import {Observable} from 'rxjs/Observable';
import {ResultPage} from '../result/result'


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  //  videoItems: Observable<any[]>;
    constructor(public nav:NavController){
      // this.videoItems = af.list('user-quiz/arsalan')
      
      // console.log(this.videoItems)
  
    //  console.log('a4arshi@yahoo.com ')
    }
    
    results(){
      
           this.nav.push(ResultPage)

      
    }
   
    
    
}
  