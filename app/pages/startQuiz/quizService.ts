import {Injectable} from "@angular/core";
@Injectable()
export class QuizService {
    saveQuizToFirebase(UserQuizObject,quiz) {
        // if Qu
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            quiz.forEach(function(question) {
                // check if question.type == 1
                if (question.type == 1) {
                    // make object of quiz question radio button object
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/options/" + 0 + "/"] = question.option;
                }
                // check if question.type == 2
                if (question.type == 2) {
                    // make object of quiz question checkbox object
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/options"] = question.option;
                }
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, index) => {

                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/html"] = questionSet.html;

                        if (questionSet.type === 1) {
                            // make object of quiz questionSet radio button object
                            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/options/" + 0 + "/"] = questionSet.option;

                        }
                        else {
                            // make object of quiz questionSet radio button object
                            questionSet.option.forEach((questionSetOption, optionIndex) => {
                                multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + index + "/options/" + optionIndex + "/html"] = questionSetOption.html;

                            })
                        } // else statement in if(question.type === 3) end

                    });//question questiones forEach end

                }// if statement type == 3 end

            }) // quiz.forEach end
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(multipathObject, function(error) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        resolve()
                    }
                }) // multipath update end
            })//Promise end


        }//if statement end
    } // saveQuizToFirebase
}
