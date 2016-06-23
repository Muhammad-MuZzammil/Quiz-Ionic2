import {Injectable} from "@angular/core";
import { Headers, Http,RequestOptions,Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()

export class GetGroupQuizSchedule {
    userId: string;
    user: any;
    groupQuiz = [];
    groupQuizId = [];
    QuizScheduleKey = [];
    handleError = "Error";
    constructor(private http: Http) {
        // Get data from localStorage;
        this.user = localStorage.getItem("ngStorage-LoggedInUser")
        this.user = JSON.parse(this.user);
        this.userId = this.user.userID;
    }

    getQuiz() {
        return new Promise((resolve, reject) => {
            // first data user all subgroup membership
            firebase.database().ref("user-subgroup-memberships").child(this.userId).on("value", (userData) => {
                for (var groupId in userData.val()) {
                    for (var subgroupId in userData.val()[groupId]) {
                        if (userData.val()[groupId][subgroupId]["membership-type"] > 0) {
                            var QuizSchedule = firebase.database().ref("quiz-schedule").child(groupId).child(subgroupId);
                            QuizSchedule.off("child_added");
                            QuizSchedule.on("child_added", (snapshot) => {
                                for(var scheduleId in snapshot.val().schedules) {
                                        var QuizSchedule = {
                                           imgLogoUrl: snapshot.val().imgLogoUrl,
                                           quizTitle: snapshot.val().title,
                                           duration: snapshot.val().duration,
                                           schedule: snapshot.val().schedules[scheduleId]["title"],
                                           startTime: snapshot.val().schedules[scheduleId]["start-time"],
                                           scheduleIsStarted: snapshot.val().schedules[scheduleId]["started"],
                                           groupId: groupId,
                                           subgroupId: subgroupId,
                                           scheduleId: scheduleId
                                       }; //QuizSchedule Obj
                                     this.groupQuiz.push(QuizSchedule);
                                      this.QuizScheduleKey.push(scheduleId);
                                }// for in loop end
                                this.groupQuizId.push(snapshot.key);

                                resolve(this.groupQuiz);
                            });// child_added on quiz-schedule end
                        }// if statement checking membership-type > 0 end
                    }// for in loop for getting subgroupId end
                }// for in loop for getting groupId end
            })//value event user-subgroup-memberships end
        }) // promise end
    }//getQuiz function end

    // get Quiz Id by index
    getQuizId(index) {
        return this.groupQuizId[index]
    }
    getCurrentUser() {
        return this.userId
    }
    checkQuizSchedule(quizObj) {
        let headers: Headers = new Headers();
		headers.append('Content-Type', "text/plain");

		let options: RequestOptions = new RequestOptions();
		options.headers = headers;
        // return new Promise((resolve) => {
        return  this.http.post("https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/checkquizschedule", JSON.stringify(quizObj), options)
        //         .map((res)=> res.json())
        //         .subscribe((res: Response) => {
        //             console.log(res.json())
        //             resolve(res.json());
        //  })
    // })

        // let headers = new Headers({
        // 'Content-Type': "text/plain"});
        //
        //   this.http
        //              .post("https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/checkquizschedule", JSON.stringify(quizObj))
        //              .subscribe(res => )
    //     let headers: Headers = new Headers();
    //     headers.append("Content-Type", "text/plain");
    //     let options: RequestOptions = new RequestOptions();
    //     options.headers = headers;
    //     // $http.defaults.headers.post["Content-Type"] = "text/plain";
    //     return  this._http.post("https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/checkquizschedule", quizObj)
    //                        .map(res => res.json());
    //     // $http.post(appConfig.apiBaseUrl + '/checkquizschedule', quizObj)
    //     //     .success(function(data, status, headers, config) {
    //     //         if (data.statusCode === 0) {
    //     //             defer.resolve(data.statusDesc);
    //     //         } else {
    //     //             defer.reject(data.statusDesc);
    //     //         }
    //     //     })
    //     //     .error(function(data, status, headers, config) {
    //     //         console.log('Quiz error response object: ' + JSON.stringify(data));
    //     //         defer.reject('Error occurred in sending data. Please try again.');
    //     //     });
    }
}
