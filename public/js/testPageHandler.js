const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const questionHtml = document.querySelector(".question");
const choiceA = document.querySelector(".choice-a");
const choiceB = document.querySelector(".choice-b");
const choiceC = document.querySelector(".choice-c");
const choiceD = document.querySelector(".choice-d");
const questionNumber = document.querySelector(".question-number");
const singleQuestionRadioA = document.querySelector("#a");
const singleQuestionRadioB = document.querySelector("#b");
const singleQuestionRadioC = document.querySelector("#c");
const singleQuestionRadioD = document.querySelector("#d");
const answerContainerQuestionNumbers = document.querySelectorAll(
  ".answers-question-number"
);

const test_id = window.location.href[window.location.href.length - 1];
const questionsUrl = "/math/" + test_id + "/questions";
let currentQuestion = 1;
const answersArray = [];
const currentQuestionHandler = (
  questions,
  currentQuestion,
  answersArray,
  questionsLength
) => {
  if (currentQuestion === 1) {
    leftArrow.classList.add("nonclickable");
  }
  if (currentQuestion > 1) {
    leftArrow.classList.remove("nonclickable");
  }
  if (currentQuestion === questionsLength) {
    rightArrow.classList.add("nonclickable");
  }
  if (currentQuestion < questionsLength) {
    rightArrow.classList.remove("nonclickable");
  }
  let currentQuestionObject = questions.questions[currentQuestion - 1];
  questionNumber.innerText = currentQuestion;
  questionHtml.innerText = currentQuestionObject.question;
  choiceA.innerText = currentQuestionObject.choices.a;
  choiceB.innerText = currentQuestionObject.choices.b;
  choiceC.innerText = currentQuestionObject.choices.c;
  choiceD.innerText = currentQuestionObject.choices.d;
  switch (answersArray[currentQuestion - 1].answer) {
    case "a":
      singleQuestionRadioA.checked = true;
      break;
    case "b":
      singleQuestionRadioB.checked = true;
      break;
    case "c":
      singleQuestionRadioC.checked = true;
      break;
    case "d":
      singleQuestionRadioD.checked = true;
      break;
    default:
      singleQuestionRadioA.checked = false;
      singleQuestionRadioB.checked = false;
      singleQuestionRadioC.checked = false;
      singleQuestionRadioD.checked = false;
  }
};

leftArrow.classList.add("nonclickable");
axios
  .get(questionsUrl)
  .then((data) => {
    return JSON.parse(data.data);
  })
  .then((questions) => {
    const questionsLength = questions.questions.length;
    for (let i = 0; i < questionsLength; i++) {
      answersArray.push({ answer: null });
    }
    rightArrow.addEventListener("click", () => {
      if (currentQuestion + 1 <= questionsLength) {
        currentQuestion += 1;
        currentQuestionHandler(
          questions,
          currentQuestion,
          answersArray,
          questionsLength
        );
      }
    });
    leftArrow.addEventListener("click", () => {
      if (currentQuestion - 1 >= 1) {
        currentQuestion -= 1;
        currentQuestionHandler(
          questions,
          currentQuestion,
          answersArray,
          questionsLength
        );
      }
    });
    choiceA.addEventListener("click", () => {
      const answerContainerChoice = document.querySelector(
        `#a-${currentQuestion}`
      );
      answersArray[currentQuestion - 1].answer = "a";
      answerContainerChoice.checked = true;
    });
    choiceB.addEventListener("click", () => {
      const answerContainerChoice = document.querySelector(
        `#b-${currentQuestion}`
      );
      answersArray[currentQuestion - 1].answer = "b";
      answerContainerChoice.checked = true;
    });
    choiceC.addEventListener("click", () => {
      const answerContainerChoice = document.querySelector(
        `#c-${currentQuestion}`
      );
      answersArray[currentQuestion - 1].answer = "c";
      answerContainerChoice.checked = true;
    });
    choiceD.addEventListener("click", () => {
      const answerContainerChoice = document.querySelector(
        `#d-${currentQuestion}`
      );
      answersArray[currentQuestion - 1].answer = "d";
      answerContainerChoice.checked = true;
    });
    answerContainerQuestionNumbers.forEach((number, index) => {
      number.addEventListener("click", () => {
        currentQuestion = index + 1;
        currentQuestionHandler(
          questions,
          currentQuestion,
          answersArray,
          questionsLength
        );
      });
    });
  });
