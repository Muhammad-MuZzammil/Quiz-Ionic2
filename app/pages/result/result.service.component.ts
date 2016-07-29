import {Injectable} from "@angular/core";

@Injectable()

export class ResultQuizService {
    constructor() { }

    checkIsQuizGiven(quiz, quizId, userId) {
        return new Promise((resolve, reject) => {
            firebase.database().ref("quiz-answer-users").child(userId).child(quiz.groupId).child(quiz.subgroupId).child(quizId).once("value", (quizSnapshot) => {
                resolve(quizSnapshot.val())
            })
        })

    }
}