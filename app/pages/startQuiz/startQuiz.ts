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
        this.data= this.af.database.list('quiz-in-progress/quiz01/')
        // console.log(this.data);
        this.data.forEach( (val) => {
            // console.log(val)
            val.forEach( (questionbanks)=> {
                // console.log(object.$key)
                // console.log(object.mybook)
                
                if(questionbanks.$key === "questionbanks") {
                        for (var book in questionbanks) {
                            //    console.log('keyyyyy',key)
                            //    console.log('objectttttt',object[key])
                            //    console.log('objecttttttchappppppppp',object[key].chapters)
                               
                               
                               
                        for (var chapterID in questionbanks[book].chapters) {
                            //    console.log('keyyyyy11',questionbanks[book].chapters[chapterID])
                         
                         
                                 
                        for (var topicID in questionbanks[book].chapters[chapterID].topics) {
                            //    console.log('keyyyyy11',questionbanks[book].chapters[chapterID].topics[topicID])
                         
                         for (var QuestionsID in questionbanks[book].chapters[chapterID].topics[topicID].questions) {
                            //    console.log('keyyyyy11',questionbanks[book].chapters[chapterID].topics[topicID].questions[QuestionsID])
                         
                       this.questionArr.push(questionbanks[book].chapters[chapterID].topics[topicID].questions[QuestionsID]);
                            //    console.log(this.questionArr)
   
   
                     this.questionArr.forEach((Question) => {
                            //    console.log(Question)
                               
                         for (var option in Question) {
                            //    console.log(Question[option]);
                            //    console.log(Question.type);
                             if (Question.type === 1) {
                                 
                            //    console.log(Question.type);
                         for (var showOpt in Question[option]) {
                               console.log(showOpt);
                          
                          
                            
                         } 
                             }
                             
                         }                               
                         
                     });
                         
                         }
                    }  
                        
                    }                            
                    
                       
                        
                               
                        }
                    }
                    
                    
                    
            })
        })
    }
  
}
  