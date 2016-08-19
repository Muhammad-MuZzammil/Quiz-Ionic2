import {Injectable} from "@angular/core";
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {tot} from "./../../app";
@Injectable()

export class GroupQuizService {
    userId: string;
    user: any;
    groupQuiz = [];
    groupQuizId = [];
    QuizScheduleKey = [];
    userData: Object;
    handleError = "Error";
    UserName: string;
    constructor(private http: Http) {
        // Get data from localStorage;
        this.user = localStorage.getItem("ngStorage-LoggedInUser")
        this.user = JSON.parse(this.user);
        this.userId = this.user.userID;
        // this.getUserQuizAnswer();
    }

    getQuiz() {
        this.groupQuiz = [];
        this.groupQuizId = [];
        return new Promise((resolve, reject) => {
            // first data user all subgroup membership
            firebase.database().ref("user-subgroup-memberships").child(this.userId).on("child_added", (group) => {
                for (var subgroupId in group.val()) {
                    if (group.val()[subgroupId]["membership-type"] > 0) {
                        var QuizSchedule = firebase.database().ref("quiz-schedule").child(group.key).child(subgroupId);
                        QuizSchedule.off("child_changed")
                        QuizSchedule.on("child_changed", function (changedSnapshot) {
                            console.log("changedddddddddddddddddddddddddddddddddddd", changedSnapshot.val())
                        })
                        QuizSchedule.off("child_added");
                        QuizSchedule.on("child_added", (snapshot) => {
                            for (var scheduleId in snapshot.val().schedules) {
                                var QuizSchedules = {
                                    imgLogoUrl: snapshot.val().imgLogoUrl,
                                    quizTitle: snapshot.val().title,
                                    duration: snapshot.val().duration,
                                    "passing-marks": snapshot.val()["passing-marks"],
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
    UserData(userData) {
        this.userData = userData;
    }
    getUserQuizData() :Object {
        return this.userData;
    }
    saveCurrentUserName(user) {
        this.UserName = `${user.firstName + " " + user.lastName}`
    }
    getCurrentUserName() :string {
        return this.UserName;
    }
    checkQuizSchedule(quizObj) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        let options: RequestOptions = new RequestOptions();
        options.headers = headers;
        return this.http.post(`${tot + "checkquizschedule" }`, JSON.stringify(quizObj), options)
    }
    checkQuizProtectKey(quizId) {
        return new Promise((resolve, reject) => {
            firebase.database().ref("has-quiz-protected-key").child(quizId).child("protectedKey").once("value", (snapshot) => {
                resolve(snapshot.val());
            })
        });

    }
    
    getUserQuizAnswer() {
        firebase.database().ref("quiz-answer-users").child("arsalanrajput").child("group").child("subgroup").child("html5").once("value", (quizAns) => {
            if (quizAns.val().questionbanks !== null) {
                for (var book in quizAns.val().questionbanks) {
                    for (var chapter in quizAns.val().questionbanks[book].chapters) {
                        for (var topic in quizAns.val().questionbanks[book].chapters[chapter].topics) {
                            quizAns.val().questionbanks[book].chapters[chapter].topics[topic].questions.forEach(question => {
                                // console.log(question,"question question question")
                                for (var questionKey in question) {
                                    // console.log(question[questionKey],"question[questionKey]")
                                    if (question[questionKey].questions) {
                                        console.log(question[questionKey].questions)
                                    } else {
                                        console.log(question[questionKey], "options")
                                        question[questionKey].options.forEach(selectedOption => {
                                            console.log(selectedOption, "selectedOption")
                                        });
                                    }
                                    // console.log(this.quiz.questionbanks[book].chapters[chapter].topics[topic].questions[questionKey],"questionKey")
                                }
                            });
                        }
                    }
                }
            }

        })
    }
}
