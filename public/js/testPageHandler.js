const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const questionHtml = document.querySelector(".question");
const choiceA = document.querySelector(".choice-a");
const choiceB = document.querySelector(".choice-b");
const choiceC = document.querySelector(".choice-c");
const choiceD = document.querySelector(".choice-d");
const questionNumber = document.querySelector(".question-number");

const test_id = window.location.href[window.location.href.length - 1];
const questionsUrl = "/math/" + test_id + "/questions";
let currentQuestion = 1;
leftArrow.classList.add("nonclickable");
axios
  .get(questionsUrl)
  .then((data) => {
    return JSON.parse(data.data);
  })
  .then((questions) => {
    const questionsLength = questions.questions.length;
    console.log(questions);
    rightArrow.addEventListener("click", () => {
      if (currentQuestion + 1 <= questionsLength) {
        currentQuestion += 1;
        currentQuestionObject = questions.questions[currentQuestion - 1];
        questionNumber.innerText = currentQuestion;
        questionHtml.innerText = currentQuestionObject.question;
        choiceA.innerText = currentQuestionObject.choices.a;
        choiceB.innerText = currentQuestionObject.choices.b;
        choiceC.innerText = currentQuestionObject.choices.c;
        choiceD.innerText = currentQuestionObject.choices.d;
        if (currentQuestion === questionsLength) {
          rightArrow.classList.add("nonclickable");
        }
      }
      if (currentQuestion > 1) {
        leftArrow.classList.remove("nonclickable");
      }
    });
    leftArrow.addEventListener("click", () => {
      if (currentQuestion - 1 >= 1) {
        currentQuestion -= 1;
        currentQuestionObject = questions.questions[currentQuestion - 1];
        questionNumber.innerText = currentQuestion;
        questionHtml.innerText = currentQuestionObject.question;
        choiceA.innerText = currentQuestionObject.choices.a;
        choiceB.innerText = currentQuestionObject.choices.b;
        choiceC.innerText = currentQuestionObject.choices.c;
        choiceD.innerText = currentQuestionObject.choices.d;
        if (currentQuestion === 1) {
          leftArrow.classList.add("nonclickable");
        }
      }
      if (currentQuestion < questionsLength) {
        rightArrow.classList.remove("nonclickable");
      }
    });
  });
