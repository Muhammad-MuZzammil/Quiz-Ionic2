import {Injectable} from "@angular/core";


@Injectable()

export class GetGroupQuizSchedule {
    userId: string;
    user: any;
    groupQuiz = [];
    groupQuizId = [];
    QuizScheduleKey = [];
    constructor() {
        // Get data from localStorage;
        this.user = localStorage.getItem("ngStorage-LoggedInUser")
        this.user = JSON.parse(this.user);
        this.userId = this.user.userID;
    }

    getQuiz() {
        return new Promise((resolve, reject) => {
            // first data user all subgroup membership
            firebase.database().ref("user-subgroup-memberships").child(this.userId).on("value", (snapshot) => {
                for (var groupId in snapshot.val()) {
                    for (var subgroupId in snapshot.val()[groupId]) {
                        if (snapshot.val()[groupId][subgroupId]["membership-type"] > 0) {
                            var QuizSchedule = firebase.database().ref("quiz-schedule").child(groupId).child(subgroupId);
                            QuizSchedule.off("child_added");
                            QuizSchedule.on("child_added", (snapshot) => {

                                //Get Schedule data from quiz
                                QuizSchedule.child(snapshot.key).child("schedules").off("child_added");

                                //Get data when child_changed if quiz schedules started

                                QuizSchedule.child(snapshot.key).child("schedules").orderByChild("started").off("child_changed");
                                QuizSchedule.child(snapshot.key).child("schedules").orderByChild("started").on("child_changed", (childChanged) => {

                                    // Find changed data in group Quiz Array and replace with changed Data;

                                    var groupQuizIndex = this.QuizScheduleKey.indexOf(childChanged.key);
                                    this.groupQuiz[groupQuizIndex].scheduleIsStarted = childChanged.val().started;

                                }); // Add data in group quiz Array when child_changed

                                QuizSchedule.child(snapshot.key).child("schedules").on("child_added", (schedule) => {
                                    // push child_added in local Array _self.groupQuiz and ScheduleKey in QuizScheduleKey Array
                                    var QuizSchedule = {
                                        imgLogoUrl: snapshot.val().imgLogoUrl,
                                        quizTitle: snapshot.val().title,
                                        duration: snapshot.val().duration,
                                        schedule: schedule.val().title,
                                        startTime: schedule.val()["start-time"],
                                        scheduleIsStarted: schedule.val().started,
                                        groupId: groupId,
                                        subgroupId: subgroupId,
                                        scheduleId: schedule.key
                                    };
                                    this.groupQuiz.push(QuizSchedule);
                                    this.QuizScheduleKey.push(schedule.key);
                                });// child_added getting all scdules end
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
}
