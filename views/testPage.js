const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `<div class="container">
    <div class="flex-center">
      <h1>Trigonometri 1</h1>
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
        <div class="question">sin(30) kaçtır?</div>
        <div class="choices">
          <div class="choice">
            <input
              type="radio"
              class="single-question-radio"
              name="choice"
              id="a"
            /><label class="single-question-radio-label choice-a" for="a"
              >A</label
            >
          </div>
          <div class="choice">
            <input
              type="radio"
              class="single-question-radio"
              name="choice"
              id="b"
            />
            <label class="single-question-radio-label choice-b" for="b"
              >B</label
            >
          </div>
          <div class="choice">
            <input
              type="radio"
              class="single-question-radio"
              name="choice"
              id="c"
            /><label class="single-question-radio-label choice-c" for="c"
              >C</label
            >
          </div>
          <div class="choice">
            <input
              type="radio"
              class="single-question-radio"
              name="choice"
              id="d"
            /><label class="single-question-radio-label choice-d" for="d"
              >D</label
            >
          </div>
        </div>
      </div>
      <div class="answers-container">
        <form action="" method="post">
          <div class="answer-container">
            <div class="answers-question-number">1</div>
            <input
              class="student-answer-radio"
              type="radio"
              name="1"
              id="a-1"
            />
            <label for="a-1">A</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="1"
              id="b-1"
            />
            <label for="b-1">B</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="1"
              id="c-1"
            />
            <label for="c-1">C</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="1"
              id="d-1"
            />
            <label for="d-1">D</label>
          </div>
          <div class="answer-container">
            <div class="answers-question-number">2</div>
            <input
              class="student-answer-radio"
              type="radio"
              name="2"
              id="a-2"
            />
            <label for="a-2">A</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="2"
              id="b-2"
            />
            <label for="b-2">B</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="2"
              id="c-2"
            />
            <label for="c-2">C</label>
            <input
              class="student-answer-radio"
              type="radio"
              name="2"
              id="d-2"
            />
            <label for="d-2">D</label>
          </div>
          <button class="submit-answers" type="submit">Testi bitir</button>
        </form>
      </div>
    </div>
  </div>
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
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>`,
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
    rel="stylesheet"
  />`,
    styles: ["/css/testPage.css"],
  });
};
