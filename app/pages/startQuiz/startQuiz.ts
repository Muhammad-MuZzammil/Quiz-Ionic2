import {Page, NavController} from 'ionic-angular';
// import {AngularFire} from 'angularfire2';
// import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';





@Page({
    templateUrl: 'build/pages/startQuiz/startQuiz.html'
})
export class startQuiz implements OnInit {
    // data : Observable<any[]>;
    data: FirebaseListObservable<any[]>;
    questionArr: any[] = [];
    constructor(public nav: NavController, public af: AngularFire) { }
    ngOnInit() {
        this.data = this.af.database.list('quiz-in-progress/quiz01/')
        this.data.forEach((val) => {
            // console.log(val)
            val.forEach((object) => {
                // console.log(object.$key)
                // console.log(object.mybook)

                if (object.$key === "questionbanks") {
                    for (var book in object) {
                        //    console.log('book',object[book])                    


                        for (var chapter in object[book].chapters) {
                            //    console.log("chapter", object[book].chapters[chapter])



                            for (var topic in object[book].chapters[chapter].topics) {
                                //    console.log('topic',object[book].chapters[chapter].topics[topic])

                                for (var question in object[book].chapters[chapter].topics[topic].questions) {
                                    //    console.log('keyyyyy1111111',object[key].chapters[key1].topics[key2].questions[key3])
                                    this.questionArr.push(object[book].chapters[chapter].topics[topic].questions[question]);
                                    
                                   
                                    // if (object[book].chapters[chapter].topics[topic].questions[question].type == 1) {
                                        // console.log(123);                                        
                                    // }
                                    // else if(object[book].chapters[chapter].topics[topic].questions[question].type == 3){
                                        // console.log(321);                                        
                                    // }
                                    // console.log(this.questionArr)

                                }
                              }
                            }
                          }        
                        }
                    })
                    
            // for (var index = 0; index < this.questionArr.length; index++) {
            //     var element = this.questionArr[index];
            //     console.log(element)

            // }
        })
        
    }

}
