const layout = require("./layout");

module.exports = (tests, testsPercentage) => {
  const createTestTemplate = () => {
    let testTemplate = tests.map((test) => {
      testName = test.test_information.name;
      let { t, f, b } = test.math;
      difficulty = test.test_information.difficulty;
      let color;
      switch (difficulty) {
        case "easy":
          color = "#82c91e";
          break;
        case "medium":
          color = "#fab005";
      }
      return `<li class="lecture-list-item" style="background-color:${color}">
      <div class="lecture-topic">
        <div class="lecture-topic-name"><a class="lecture-link"href="/math/${test.math.test_id}">${testName}</a></div>
        <div class="lecture-topic-stats">
          <div class="correct">
            <div class="stat-first-letter">D:</div>
            <div class="stat-number">${t}</div>
          </div>
          <div class="false">
            <div class="stat-first-letter">Y:</div>
            <div class="stat-number">${f}</div>
          </div>
          <div class="blank">
            <div class="stat-first-letter">B:</div>
            <div class="stat-number">${b}</div>
          </div>
        </div>
      </div>
    </li>`;
    });
    testTemplate = testTemplate.join("");
  };
  return layout({
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
    rel="stylesheet"
  />`,
    styles: ["/css/lecture-displayer.css"],
    content: `<div class="lectures-container">
    <div class="lecture">
      <div class="lecture-header">
        <div class="lecture-name">Matematik</div>
        <div
          class="lecture-progress-bar"
          data-label="%${testsPercentage}"
          style="--width: ${testsPercentage}"
        ></div>
        <div class="lecture-arrow">
          <ion-icon name="caret-back-circle-outline"></ion-icon>
        </div>
      </div>
      <div class="lecture-contents">
        <ul class="lecture-list">
        </ul>
      </div>
    </div>
  </div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="/js/lectureHandler.js"></script>
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>`,
  });
};
/*return layout({
  font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
  rel="stylesheet"
/>`,
  styles: ["/css/lecture-displayer.css"],
  content: `<div class="lectures-container">
  <div class="lecture">
    <div class="lecture-header">
      <div class="lecture-name">Matematik</div>
      <div
        class="lecture-progress-bar"
        data-label="%${testsPercentage}"
        style="--width: ${testsPercentage}"
      ></div>
      <div class="lecture-arrow">
        <ion-icon name="caret-back-circle-outline"></ion-icon>
      </div>
    </div>
    <div class="lecture-contents">
      <ul class="lecture-list">
        ${testTemplate}
      </ul>
    </div>
  </div>
</div>
<script>
  const lectureArrow = document.querySelector(".lecture-arrow");
  const lectureContents = document.querySelector(".lecture-contents");
  /*lectureArrow.addEventListener("click", () => {
    lectureContents.forEach((lecture) => {
      lecture.classList.toggle("is-shrinking");
    });
  });
  const adjustHeight = () => {
    if (lectureContents.clientHeight) {
      lectureContents.style.height = 0;
      lectureArrow.classList.remove("rotated-arrow");
    } else {
      lectureArrow.classList.add("rotated-arrow");
      lectureContents.style.height = lectureContents.scrollHeight + "px";
    }
  };
  const fetchTestData = async ()=>{
    const data = await axios.get("/math");
    console.log(data);
  }
  lectureArrow.addEventListener("click", adjustHeight);
</script>
<script
  type="module"
  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
></script>*/
