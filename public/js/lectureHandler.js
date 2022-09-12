const lectureArrow = document.querySelector(".lecture-arrow");
const lectureContents = document.querySelector(".lecture-contents");
const lectureList = document.querySelector(".lecture-list");
/*lectureArrow.addEventListener("click", () => {
  lectureContents.forEach((lecture) => {
    lecture.classList.toggle("is-shrinking");
  });
});*/
const adjustHeight = () => {
  if (lectureContents.clientHeight) {
    lectureContents.style.height = 0;
    lectureArrow.classList.remove("rotated-arrow");
  } else {
    lectureArrow.classList.add("rotated-arrow");
    lectureContents.style.height = lectureContents.scrollHeight + "px";
  }
};
const fetchTestData = async () => {
  const data = await axios.get("/math");
  return JSON.parse(data.data);
};
lectureArrow.addEventListener("click", async () => {
  if (!lectureList.hasChildNodes()) {
    const data = await fetchTestData();
    createTestTemplate(data);
  }
  adjustHeight();
});

const createTestTemplate = (tests) => {
  tests.forEach((test) => {
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

    const lectureListItem = document.createElement("li");
    lectureListItem.classList.add("lecture-list-item");
    lectureListItem.style.backgroundColor = color;

    const lectureTopic = document.createElement("div");
    lectureTopic.classList.add("lecture-topic");

    const lectureTopicName = document.createElement("div");
    lectureTopicName.classList.add("lecture-topic-name");

    const lectureLink = document.createElement("a");
    lectureLink.classList.add("lecture-link");
    lectureLink.href = `/math/${test.math.test_id}`;
    lectureLink.innerText = testName;

    const lectureTopicStats = document.createElement("div");
    lectureTopicStats.classList.add("lecture-topic-stats");

    const correct = document.createElement("div");
    correct.classList.add("correct");
    const statLetterForCorrect = document.createElement("div");
    statLetterForCorrect.classList.add("stat-first-letter");
    statLetterForCorrect.innerText = "D:";
    const statNumberForCorrect = document.createElement("div");
    statNumberForCorrect.classList.add("stat-number");
    statNumberForCorrect.innerText = t;
    correct.appendChild(statLetterForCorrect);
    correct.appendChild(statNumberForCorrect);

    const falseQ = document.createElement("div");
    falseQ.classList.add("false");
    const statLetterForFalse = document.createElement("div");
    statLetterForFalse.classList.add("stat-first-letter");
    statLetterForFalse.innerText = "Y:";
    const statNumberForFalse = document.createElement("div");
    statNumberForFalse.classList.add("stat-number");
    statNumberForFalse.innerText = f;
    falseQ.appendChild(statLetterForFalse);
    falseQ.appendChild(statNumberForFalse);

    const blank = document.createElement("div");
    blank.classList.add("blank");
    const statLetterForBlank = document.createElement("div");
    statLetterForBlank.classList.add("stat-first-letter");
    statLetterForBlank.innerText = "B:";
    const statNumberForBlank = document.createElement("div");
    statNumberForBlank.classList.add("stat-number");
    statNumberForBlank.innerText = b;
    blank.appendChild(statLetterForBlank);
    blank.appendChild(statNumberForBlank);

    lectureTopicStats.appendChild(correct);
    lectureTopicStats.appendChild(falseQ);
    lectureTopicStats.appendChild(blank);

    lectureTopicName.appendChild(lectureLink);

    lectureTopic.appendChild(lectureTopicName);
    lectureTopic.appendChild(lectureTopicStats);

    lectureListItem.appendChild(lectureTopic);
    lectureList.appendChild(lectureListItem);
  });
};
