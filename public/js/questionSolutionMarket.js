const askedQuestionsContent = document.querySelector(
  ".questions-asked-contents"
);
const askedQuestionsArrow = document.querySelector(".questions-asked-arrow");
const questionsAskedList = document.querySelector(".questions-asked-list");
const adjustHeight = () => {
  if (askedQuestionsContent.clientHeight) {
    askedQuestionsContent.style.height = 0;
    askedQuestionsArrow.classList.remove("rotated-arrow");
  } else if (
    !askedQuestionsContent.clientHeight &&
    askedQuestionsArrow.classList.contains("rotated-arrow")
  ) {
    askedQuestionsArrow.classList.remove("rotated-arrow");
  } else {
    askedQuestionsArrow.classList.add("rotated-arrow");
    askedQuestionsContent.style.height =
      askedQuestionsContent.scrollHeight + "px";
  }
};

askedQuestionsArrow.addEventListener("click", async () => {
  if (!questionsAskedList.hasChildNodes()) {
    const data = await fetchAskedQuestions();
    createAskedQuestionItemTemplate(data);
  }
  adjustHeight();
});

const fetchAskedQuestions = async () => {
  let results = await axios.get("/sorucozum/askedQuestions");
  results = JSON.parse(results.data);
  const teacherIds = results.map((order) => {
    return function () {
      axios.get(`/sorucozum/getTeacherInformation/${order.teacherId}`);
    };
  });
  console.log(teacherIds[0]);
  const teacherInformations = await fetchTeacherInformations(teacherIds);
  console.log(teacherInformations);
  return results;
};

const fetchTeacherInformations = async (teacherIds) => {
  const teachers = await Promise.all(teacherIds);
  return teachers;
};

const createAskedQuestionItemTemplate = (askedQuestions) => {
  askedQuestions.forEach((order) => {
    const orderItem = document.createElement("li");
    orderItem.classList.add("order-item");
    const orderTeacherContainer = document.createElement("div");
    orderTeacherContainer.classList.add("order-teacher-container");
    order.questions.forEach((question) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerText = question.explanation;
      orderItem.appendChild(questionDiv);
    });
    questionsAskedList.appendChild(orderItem);
  });
};
