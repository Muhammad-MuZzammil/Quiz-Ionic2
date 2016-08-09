import {Injectable} from "@angular/core";

@Injectable()

export class ResultQuizService {
    constructor() { }

    checkIsQuizGiven(quiz, quizId, userId) {
        let quizResult = [];
        return new Promise((resolve, reject) => {
            firebase.database().ref("quiz-result").child(quiz.groupId).child(quiz.subgroupId).child(userId).child(quizId).once("value", (quizSnapshot) => {
                console.log("quizSnapshottttttttttttttttttttttttttttttttttttttt", quizSnapshot.val())
                if (quizSnapshot.val() !== null) {
                    for (var key in quizSnapshot.val()) {
                        quizResult.push(quizSnapshot.val()[key])
                    }
                    resolve(quizResult)
                }
                else {
                    resolve("Null")
                }
            })
        })
    }
}