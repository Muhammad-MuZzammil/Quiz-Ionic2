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
    saveRandomQuestion(quiz , UserQuizObject,questionKeyArray) {
        firebase.database.enableLogging(true);
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            console.log(quiz)
            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/total-score"] = 0
            // multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/start-time"] = firebase.database.ServerValue.TIMESTAMP;
            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/question-started-index"] = 0;
            quiz.forEach(function(question, i) {
                var questionKey = questionKeyArray[i]
                var questionRandomIndex = i == 0 ? quiz.length - 1 : quiz.length - (i + 1);
                console.log(questionRandomIndex);
                // check if question.type == 1
                if (question.type == 1) {
                    // make object of quiz question radio button object
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/correct"] = false;
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/timer"] = 50;
                    question.options.forEach((option, optionIndex) => {
                        var optionRandomIndex = optionIndex == 0 ? question.options.length - 1 : question.options.length - (optionIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/options/" + optionRandomIndex + "/" + optionIndex + "/"] = option.html;
                    })
                }
                // check if question.type == 2
                if (question.type == 2) {
                    // make object of quiz question checkbox object
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/correct"] = false;
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/timer"] = 50;
                    question.options.forEach((option, optionIndex) => {
                        var optionRandomIndex = optionIndex == 0 ? question.options.length - 1 : question.options.length - (optionIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/options/" + optionRandomIndex + "/" + optionIndex + "/"] = option.html;
                    })
                }
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, questionSetIndex) => {
                        var questionSetRandomIndex = questionSetIndex == 0 ? question.questiones.length - 1 : question.questiones.length - (questionSetIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/html"] = questionSet.html;
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/correct"] = false;

                        // if (questionSet.type === 1) {
                        //     // make object of quiz questionSet radio button object
                        //     multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/options/" + 0 + "/"] = questionSet.option;
                        //
                        // }
                        // else {
                        //     // make object of quiz questionSet radio button object
                        //     questionSet.option.forEach((questionSetOption, optionIndex) => {
                        //         multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/options/" + optionIndex + "/html"] = questionSetOption.html;
                        //
                        //     })
                        // } // else statement in if(question.type === 3) end

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
    }
}
