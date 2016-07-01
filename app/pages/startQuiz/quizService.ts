import {Injectable} from "@angular/core";
@Injectable()
export class QuizService {
    quizQuestionOriginalKeyArray = [];
    quizQuestionSetOriginalKeyArray = [];
    quizOptionOriginalKeyArray = [];
    quizQuestionKeyArray = [];
    quizQuestionArr = [];
    saveQuizToFirebase(UserQuizObject,quiz,questioStartedIndex) {
        // if Qu
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            quiz.forEach((question) => {
                var questionRandomIndex = this.quizQuestionOriginalKeyArray.indexOf(question.questionKey)
                // check if question.type == 1
                multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/question-started-index"] = questioStartedIndex;
                multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + question.questionKey + "/timer"] = question.timer;
                if (question.type == 1) {
                    // make object of quiz question radio button object
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + question.questionKey + "/options/" + question.optionRandomIndex + "/" + question.optionOriginalIndex + "/"] = true;
                }
                // check if question.type == 2
                if (question.type == 2) {
                    // make object of quiz question checkbox object
                    question.optionOriginalIndex.forEach((checkboxOption, checkboxOptionIndex) => {
                        var CheckboxOptionRandomIndex = question.optionRandomIndex[checkboxOptionIndex].CheckboxOptionRandomIndex;
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + question.questionKey + "/options/" + CheckboxOptionRandomIndex + "/" + checkboxOption.checkboxOriginalIndex + "/"] = true;
                    })
                }
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, questionSetIndex) => {
                        var questionSetRandomIndex = questionSetIndex == 0 ? question.questiones.length - 1 : question.questiones.length - (questionSetIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + question.questionKey + "/timer"] = questionSet.timer;
                        if(questionSet.type === 1) {
                            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/" + questionSet.optionRandomIndex + "/" +  questionSet.optionOriginalIndex] = true;
                        }
                        if(questionSet.type === 2) {
                            questionSet.optionOriginalIndex.forEach((checkboxOption, checkboxOptionIndex) => {
                                console.log(checkboxOption,"checkboxOption")
                                var CheckboxOptionRandomIndex = questionSet.optionRandomIndex[checkboxOptionIndex].CheckboxOptionRandomIndex;
                                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/" + CheckboxOptionRandomIndex + "/" +  checkboxOption.checkboxOriginalIndex] = true;
                            })
                        }
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

    // save quiz question randomly
    saveRandomQuestion(quiz, UserQuizObject,questionKeyArray) {
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/total-score"] = 0
            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/question-started-index"] = 0;
            quiz.forEach(function(question, i) {
                var questionKey = questionKeyArray[i]
                var questionRandomIndex = i == 0 ? quiz.length - 1 : quiz.length - (i + 1);
                // check if question.type == 1
                if (question.type == 1 || question.type == 2) {
                    // make object of quiz question radio button object
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/correct"] = false;
                    multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/timer"] = 0;
                    question.options.forEach((option, optionIndex) => {
                        var optionRandomIndex = optionIndex == 0 ? question.options.length - 1 : question.options.length - (optionIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/options/" + optionRandomIndex + "/" + optionIndex + "/"] = false;
                    })
                }
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, questionSetIndex) => {
                        var questionSetRandomIndex = questionSetIndex == 0 ? question.questiones.length - 1 : question.questiones.length - (questionSetIndex + 1);
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/correct"] = false;
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" +  questionRandomIndex + "/" + questionKey + "/timer"] = 0;
                        multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/correct"] = false;
                        if(questionSet.type === 1 || questionSet.type === 2) {
                            questionSet.options.forEach((questionSetOption, questionSetOptionIndex) => {
                            var questionSetOptionRandomIndex = questionSetOptionIndex == 0 ? questionSet.options.length - 1 : questionSet.options.length - (questionSetOptionIndex + 1);
                            multipathObject["answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/" + questionSetOptionRandomIndex + "/" +  questionSetOptionIndex] = false;
                            })
                        }
                    });//question questiones forEach end
                }// if statement type == 3 end
            }) // quiz.forEach end
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(multipathObject, (error) =>{
                    if (error) {
                        console.log(error)
                    }
                    else {
                        this.userQuiz(quiz, UserQuizObject,questionKeyArray).then((res)=> {
                            resolve(res)
                        })
                    }
                }) // multipath update end
            })//Promise end
        }//if statement end
    }// save quiz question randomly end

    // check user answer if null then save randomly
    userQuiz(quiz, UserQuizObject,questionKeyArray) {
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;

        return new Promise((resolve, reject) => {
            firebase.database().ref("answer-users").child(userId).child(groupId).child(subgroupId).child(quizId).once("value", (usrQuiz)=> {
                if(usrQuiz.val() == null) {
                    this.saveRandomQuestion(quiz, UserQuizObject,questionKeyArray).then(res => {
                        resolve(res)
                    })
                }
                else {
                    usrQuiz.val().questions.forEach((questionObject) => {
                        var questionkey;
                        var optionAIndexArray = [];
                        for(questionkey in questionObject) {
                            this.quizQuestionOriginalKeyArray.push(questionkey)
                        }
                        // if(questionObject[questionkey].options) {
                        //     questionObject[questionkey].options.forEach((option)=> {
                        //         for(var optionOriginalIndex in option) {
                        //             optionAIndexArray.push(optionOriginalIndex)
                        //         }
                        //     })
                        // }
                        // if(questionObject[questionkey].questiones) {
                        //     questionObject[questionkey].questiones.forEach((questionSet,index) => {
                        //         for(var questionSetOriginalIndex in questionSet) {
                        //             this.quizQuestionSetOriginalKeyArray.push({questionSetOriginalIndex: questionSetOriginalIndex});
                        //         }
                        //     })
                        // }
                        // this.quizOptionOriginalKeyArray.push({optionOriginalIndex: optionAIndexArray})
                        var optionAIndexArray = []
                    })//forEach end
                    resolve(usrQuiz.val());
                }//else end
            })//value event end
        })//Promise end
    }//userQuiz end

    getQuizInProgess(QuizUniqueId) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('quiz-in-progress').child(QuizUniqueId).once("value", (quizData) => {
                for (var book in quizData.val()["questionbanks"]) {
                    for (var chapter in quizData.val()["questionbanks"][book].chapters) {
                        for (var topic in quizData.val()["questionbanks"][book].chapters[chapter].topics) {
                            for (var question in quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions) {
                                this.quizQuestionKeyArray.push(question);
                                this.quizQuestionArr.push(quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions[question]);
                            } // for in loop questions end
                        } // for in loop Topics end
                    } // for in loop chapters end
                } // for in loop on Book end
            })
            resolve({ quizQuestionArr: this.quizQuestionArr , quizQuestionKeyArray: this.quizQuestionKeyArray})
        })
    }
}
