import {Injectable} from "@angular/core";
@Injectable()
export class QuizService {
    quizQuestionOriginalKeyArray = [];
    quizQuestionSetOriginalKeyArray = [];
    quizOptionOriginalKeyArray = [];
    quizQuestionKeyArray = [];
    quizQuestionArr = [];
    saveQuizToFirebase(UserQuizObject, quiz, questioStartedIndex) {
        // if Qu
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            quiz.forEach((question) => {
                var questionRandomIndex = this.quizQuestionKeyArray.indexOf(question.questionKey);
                questionRandomIndex = questionRandomIndex == 0 ? this.quizQuestionKeyArray.length - 1 : this.quizQuestionKeyArray.length - (questionRandomIndex + 1);
                // check if question.type == 1
                multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/duration"] = question.timer;
                multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/question-started-index"] = questioStartedIndex;
                multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/timer"] = question.timer;
                if (question.type == 1) {
                    
                    var a =  parseInt([question["optionOriginalIndex"]].toString());
                    multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/options/" + question["optionOriginalIndex"] ] = true;
                    // question.optionOriginalIndex.forEach((radioButtonOption, radioButtonIndex) => {
                    //     // make object of quiz question radio button object
                    //     multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/options/" + radioButtonOption.radioButtonOptionIndex + "/"] = true;
                    // })

                }
                // check if question.type == 2
                if (question.type == 2) {
                    // make object of quiz question checkbox object
                    question.optionOriginalIndex.forEach((checkboxOption, checkboxOptionIndex) => {
                        // var CheckboxOptionRandomIndex = question.optionRandomIndex[checkboxOptionIndex].checkboxOriginalIndex;
                        multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/options/" + checkboxOption.checkboxOriginalIndex + "/"] = true;
                    })
                }
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, questionSetIndex) => {
                        var questionSetRandomIndex = questionSetIndex == 0 ? question.questiones.length - 1 : question.questiones.length - (questionSetIndex + 1);
                        multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/timer"] = questionSet.timer;
                        if (questionSet.type === 1) {
                            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/" + + questionSet.optionOriginalIndex] = true;
                        }
                        if (questionSet.type === 2) {
                            questionSet.optionOriginalIndex.forEach((checkboxOption, checkboxOptionIndex) => {
                                // var CheckboxOptionRandomIndex = questionSet.optionRandomIndex[checkboxOptionIndex].CheckboxOptionRandomIndex;
                                multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + question.bookId + "/chapters/" + question.chapterId + "/topics/" + question.topicId + "/questions/" + questionRandomIndex + "/" + question.questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/" + checkboxOption.checkboxOriginalIndex] = true;
                            })
                        }
                    });//question questiones forEach end
                }// if statement type == 3 end

            }) // quiz.forEach end
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(multipathObject, function (error) {
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
    saveRandomQuestion(quiz, UserQuizObject, questionKeyArray) {
        var multipathObject = {};
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        if (quiz) {
            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/total-score"] = 0;
            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/is-quiz-given"] = false;
            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/question-started-index"] = 0;
            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/start-time"] = firebase.database.ServerValue.TIMESTAMP;
            multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/duration"] = 0;
            quiz.forEach(function (questionDetail, i) {

                var question = questionDetail;
                var questionKey = questionKeyArray[i]
                var questionRandomIndex = i == 0 ? quiz.length - 1 : quiz.length - (i + 1);
                // check if question.type == 1
                if (question.type == 1 || question.type == 2) {
                    // make object of quiz question radio button object
                    multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId + "/questions/" + questionRandomIndex + "/" + questionKey + "/correct"] = false;
                    multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId + "/questions/" + questionRandomIndex + "/" + questionKey + "/timer"] = 0;
                    // question.options.forEach((option, optionIndex) => {
                    //     var optionRandomIndex = optionIndex == 0 ? question.options.length - 1 : question.options.length - (optionIndex + 1);
                    //     multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId  + "/questions/" + questionRandomIndex + "/" + questionKey + "/options/" + optionIndex + "/"] = false;
                    // })
                }// question.type == 1 || question.type == 2 if statement end
                // check if question.type == 3
                if (question.type == 3) {
                    question.questiones.forEach((questionSet, questionSetIndex) => {
                        var questionSetRandomIndex = questionSetIndex == 0 ? question.questiones.length - 1 : question.questiones.length - (questionSetIndex + 1);
                        multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId + "/questions/" + questionRandomIndex + "/" + questionKey + "/correct"] = false;
                        multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId + "/questions/" + questionRandomIndex + "/" + questionKey + "/timer"] = 0;
                        multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/correct"] = false;
                        if (questionSet.type === 1 || questionSet.type === 2) {
                            // questionSet.options.forEach((questionSetOption, questionSetOptionIndex) => {
                            //     var questionSetOptionRandomIndex = questionSetOptionIndex == 0 ? questionSet.options.length - 1 : questionSet.options.length - (questionSetOptionIndex + 1);
                            //     multipathObject["quiz-answer-users/" + userId + "/" + groupId + "/" + subgroupId + "/" + quizId + "/questionbanks/" + questionDetail.bookId + "/chapters/" + questionDetail.chapterId + "/topics/" + questionDetail.topicId  + "/questions/" + questionRandomIndex + "/" + questionKey + "/questiones/" + questionSetRandomIndex + "/" + questionSetIndex + "/options/"  + questionSetOptionIndex] = false;
                            // })//questionSet options forEach end
                        }// if statement end questionSet.type === 1 || questionSet.type === 2
                    });//question questiones forEach end
                }// if statement type == 3 end
            }) // quiz.forEach end
            return new Promise((resolve, reject) => {
                firebase.database().ref().update(multipathObject, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        this.userQuiz(quiz, UserQuizObject, questionKeyArray).then((res) => {
                            resolve(res)
                        })
                    }
                }) // multipath update end
            })//Promise end
        }//if statement end
    }// save quiz question randomly end

    // check user answer if null then save randomly
    userQuiz(quiz, UserQuizObject, questionKeyArray) {
        var userId = UserQuizObject.userId;
        var groupId = UserQuizObject.groupId;
        var subgroupId = UserQuizObject.subgroupId;
        var quizId = UserQuizObject.quizId;
        return new Promise((resolve, reject) => {
            firebase.database().ref("quiz-answer-users").child(userId).child(groupId).child(subgroupId).child(quizId).once("value", (usrQuiz) => {
                if (usrQuiz.val() == null) {
                    this.saveRandomQuestion(quiz, UserQuizObject, questionKeyArray).then(res => {
                        resolve(res)
                    })
                }// if statement end
                else {
                    // usrQuiz.val().questions.forEach((questionObject) => {
                    //     var questionkey;
                    //     var optionAIndexArray = [];
                    //     for (questionkey in questionObject) {
                    //         this.quizQuestionOriginalKeyArray.push(questionkey)
                    //     }
                    //     var optionAIndexArray = []
                    // })//forEach end
                    resolve(usrQuiz.val());
                }//else end
            })//value event end
        })//Promise end
    }//userQuiz end

    //Get Quiz In Progess Data
    getQuizInProgess(QuizUniqueId) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('quiz-in-progress').child(QuizUniqueId).once("value", (quizData) => {
                this.quizQuestionArr = [];
                this.quizQuestionKeyArray = [];
                if (quizData.val() !== null) {
                    for (var book in quizData.val()["questionbanks"]) {
                        for (var chapter in quizData.val()["questionbanks"][book].chapters) {
                            for (var topic in quizData.val()["questionbanks"][book].chapters[chapter].topics) {
                                for (var questionKey in quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions) {
                                    this.quizQuestionKeyArray.push(questionKey);
                                    var obj = {
                                        question: quizData.val()["questionbanks"][book].chapters[chapter].topics[topic].questions[questionKey]
                                    }
                                    obj.question.bookId = book;
                                    obj.question.chapterId = chapter;
                                    obj.question.topicId = topic;
                                    obj.question.questionKey = questionKey
                                    this.quizQuestionArr.push(obj);
                                } // for in loop questions end
                            } // for in loop Topics end
                        } // for in loop chapters end
                    } // for in loop on Book end
                    resolve({ quizArr: this.quizQuestionArr, quizQuestionKeyArray: this.quizQuestionKeyArray });
                }
            })// firebase value event function end
        }) // Promise end
    }// Get Quiz In Progess Data end
}
