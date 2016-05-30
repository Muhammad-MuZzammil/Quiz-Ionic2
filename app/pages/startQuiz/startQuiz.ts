import {Page , NavController} from 'ionic-angular';
// import {AngularFire} from 'angularfire2';
// import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';





@Page({
  templateUrl: 'build/pages/startQuiz/startQuiz.html'
})
export class startQuiz implements OnInit {
    // data : Observable<any[]>;
    data : FirebaseListObservable<any[]>;
    questionArr:any[]=[];
    constructor(public nav : NavController,public af:AngularFire ){
        
    }
    
    ngOnInit(){
        this.data= this.af.database.list('quiz-in-progress/quiz-ID/')
        // console.log(this.data);
        this.data.forEach(function (val) {
            console.log(val)
            val.forEach(function (object) {
                // console.log(object.$key)
                // console.log(object.mybook)
                
                if(object.$key === "questionbanks") {
                        for (var key in object) {
                            //    console.log('keyyyyy',key)
                            //    console.log('objectttttt',object[key])
                            //    console.log('objecttttttchappppppppp',object[key].chapters)
                               
                               
                               
                        for (var key1 in object[key].chapters) {
                               console.log('keyyyyy11',object[key].chapters[key1])
                         
                         
                                 
                        for (var key2 in object[key].chapters[key1].topics) {
                               console.log('keyyyyy11',object[key].chapters[key1].topics[key2])
                         
                         for (var key3 in object[key].chapters[key1].topics[key2].questions) {
                               console.log('keyyyyy11',object[key].chapters[key1].topics[key2].questions[key3])
                         
                       this.questionArr.push(object[key].chapters[key1].topics[key2].questions[key3]);
                               console.log(this.questionArr)
                         
                        
                    }  
                         
                        
                    }  
                        
                    }                            
                    
                       
                        
                               
                        }
                    }
                    
                    
                    
            })
        })
    }
  
}
  