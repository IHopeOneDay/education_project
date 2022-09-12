const layout = require("./layout");

module.exports = (test) => {
  const { name, questions, test_id } = test;
  const answersContainer = () => {
    const answersCont = questions.map((question, index) => {
      return `<div class="answer-container">
      <div class="answers-question-number">${index + 1}</div>
      <input
        class="student-answer-radio"
        type="radio"
        name="${index + 1}"
        id="a-${index + 1}"
        value="a"
      />
      <label for="a-${index + 1}">A</label>
      <input
        class="student-answer-radio"
        type="radio"
        name="${index + 1}"
        id="b-${index + 1}"
        value="b"
      />
      <label for="b-${index + 1}">B</label>
      <input
        class="student-answer-radio"
        type="radio"
        name="${index + 1}"
        id="c-${index + 1}"
        value="c"
      />
      <label for="c-${index + 1}">C</label>
      <input
        class="student-answer-radio"
        type="radio"
        name="${index + 1}"
        id="d-${index + 1}"
        value="d"
      />
      <label for="d-${index + 1}">D</label>
    </div>`;
    });

    const firstQuestion = questions[0];
    const firstQuestionTemplate = `<div class="question">${firstQuestion.question}</div>
    <div class="choices">
      <div class="choice">
        <input
          type="radio"
          class="single-question-radio"
          name="choice"
          id="a"
          value="a"
        /><label class="single-question-radio-label choice-a" for="a"
          >${firstQuestion.choices.a}</label
        >
      </div>
      <div class="choice">
        <input
          type="radio"
          class="single-question-radio"
          name="choice"
          id="b"
          value="b"
        />
        <label class="single-question-radio-label choice-b" for="b"
          >${firstQuestion.choices.b}</label
        >
      </div>
      <div class="choice">
        <input
          type="radio"
          class="single-question-radio"
          name="choice"
          id="c"
          value="c"
        /><label class="single-question-radio-label choice-c" for="c"
          >${firstQuestion.choices.c}</label
        >
      </div>
      <div class="choice">
        <input
          type="radio"
          class="single-question-radio"
          name="choice"
          id="d"
          value="d"
        /><label class="single-question-radio-label choice-d" for="d"
          >${firstQuestion.choices.d}</label
        >
      </div>
    </div>`;
    return { answersCont: answersCont.join(""), firstQuestionTemplate };
  };
  return layout({
    content: `<div class="container">
    <div class="flex-center">
      <h1>${name}</h1>
    </div>
    <div class="question-answer-container">
      <div class="question-container">
        <div class="test-informations">
          <div class="question-number">1</div>
          <div class="time">
            <span class="minute">00</span>
            <span>:</span>
            <span class="second">00</span>
          </div>
          <div class="arrows">
            <div class="left-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div class="right-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </div>
        ${answersContainer().firstQuestionTemplate} 
      </div>
      <div class="answers-container">
        <form action="/math/${test_id}" method="post">
          ${answersContainer().answersCont}
          <button class="submit-answers" type="submit">Testi bitir</button>
        </form>
      </div>
    </div>
  </div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>
  <script>
    const secondText = document.querySelector(".second");
    const minuteText = document.querySelector(".minute");
    let second = 0;
    let secondModified;
    let minute = 0;
    let minuteModified;
    setInterval(() => {
      second += 1;
      if (second < 10) {
        secondModified = "0" + second;
      } else {
        secondModified = second;
      }
      if (second === 60) {
        second = 0;
        secondModified = "0" + second;
        minute += 1;
        if (minute < 10) {
          minuteModified = "0" + minute;
        } else {
          minuteModified = minute;
        }
        minuteText.innerText = minuteModified;
      }
      secondText.innerText = secondModified;
    }, 1000);
  </script>
  <script src="/js/testPageHandler.js"></script>
  `,
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
    rel="stylesheet"
  />`,
    styles: ["/css/testPage.css"],
  });
};
