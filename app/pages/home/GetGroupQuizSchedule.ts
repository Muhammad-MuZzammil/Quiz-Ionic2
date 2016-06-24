import {Injectable} from "@angular/core";
import { Headers, Http, RequestOptions, Response } from '@angular/http';
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
            firebase.database().ref("user-subgroup-memberships").child(this.userId).on("child_added", (group) => {
                for (var subgroupId in group.val()) {
                    if (group.val()[subgroupId]["membership-type"] > 0) {
                        var QuizSchedule = firebase.database().ref("quiz-schedule").child(group.key).child(subgroupId);
                        console.log(subgroupId, group.key)
                        QuizSchedule.off("child_added");
                        QuizSchedule.on("child_added", (snapshot) => {
                            for (var scheduleId in snapshot.val().schedules) {
                                var QuizSchedules = {
                                    imgLogoUrl: snapshot.val().imgLogoUrl,
                                    quizTitle: snapshot.val().title,
                                    duration: snapshot.val().duration,
                                    schedule: snapshot.val().schedules[scheduleId]["title"],
                                    startTime: snapshot.val().schedules[scheduleId]["start-time"],
                                    scheduleIsStarted: snapshot.val().schedules[scheduleId]["started"],
                                    groupId: group.key,
                                    subgroupId: subgroupId,
                                    scheduleId: scheduleId
                                }; //QuizSchedule Obj
                                this.groupQuiz.push(QuizSchedules);
                                this.QuizScheduleKey.push(scheduleId);
                            }// for in loop end
                            this.groupQuizId.push(snapshot.key);
                            resolve(this.groupQuiz);
                        }); // child_added on quiz-schedule end
                    }// if statement checking membership-type > 0 end
                }// for in loop for getting subgroupId end
            })//child_added event user-subgroup-memberships end
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
        headers.append('Content-Type', 'text/plain');
        let options: RequestOptions = new RequestOptions();
        options.headers = headers;
        console.log(quizObj)
        return this.http.post('https://b7v23qvdy1.execute-api.us-east-1.amazonaws.com/dev/checkquizschedule', JSON.stringify(quizObj), options)

    }
}
