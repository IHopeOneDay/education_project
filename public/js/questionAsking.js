const addNewQuestionButton = document.querySelector(".add-new-question");
const questionListContainer = document.querySelector(
  ".question-list-container"
);

const showImage = function (
  src,
  target,
  imageIcon,
  imageText,
  questionImageContainer,
  clickImageSelection
) {
  const fr = new FileReader();
  fr.addEventListener("load", function () {
    target.src = this.result;
  });
  src.addEventListener("change", () => {
    fr.readAsDataURL(src.files[0]);
    target.classList.add("is-visible-img");
    imageIcon.classList.add("not-visible-buttons");
    imageText.classList.add("not-visible-buttons");
    questionImageContainer.removeEventListener("click", clickImageSelection);
    questionImageContainer.style.cursor = "default";
  });
};

const addSelfDestructingEventListener = (element, eventType, callback) => {
  let handler = () => {
    callback();
    element.removeEventListener(eventType, callback);
  };
  element.addEventListener(eventType, handler);
};

addNewQuestionButton.addEventListener("click", async () => {
  const formData = new FormData();
  const questionContainers = document.querySelectorAll(".question-container");
  questionContainers.forEach((questionContainer, idx) => {
    const textArea = questionContainer.querySelector("textarea");
    const imageFile = questionContainer.querySelector(".image-selection");
    formData.append(`text-${idx}`, textArea.value);
    formData.append(`image-${idx}`, imageFile.files[0]);
  });
  formData.append("action", "add");
  const url = window.location.href.split("/");
  const postUrl = "/sorucozum/" + url[url.length - 1] + "/addNewQuestion";
  const response = await axios.post(postUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  createQuestionContainer(
    response.data.questionMarketEntity.value.questions.length
  );
  adjustClassNames();
});

const createQuestionContainer = (itemId) => {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add(
    "question-container",
    `question-container-${itemId}`
  );

  //image container
  const questionImageContainer = document.createElement("div");
  questionImageContainer.classList.add("question-image-container");
  const imageSelection = document.createElement("input");
  imageSelection.setAttribute("type", "file");
  imageSelection.setAttribute("name", `question-image-${itemId}`);
  imageSelection.classList.add("image-selection");
  const addImageButton = document.createElement("ion-icon");
  addImageButton.setAttribute("name", "camera");
  addImageButton.classList.add("add-image-button");
  const imageText = document.createElement("div");
  imageText.innerText = "Fotoğraf ekleyin";
  imageText.classList.add("image-text");
  const userQuestionImage = document.createElement("img");
  userQuestionImage.classList.add("user-question-image");
  questionImageContainer.appendChild(imageSelection);
  questionImageContainer.appendChild(addImageButton);
  questionImageContainer.appendChild(imageText);
  questionImageContainer.appendChild(userQuestionImage);
  questionContainer.appendChild(questionImageContainer);

  //explanation-container
  const questionExplanation = document.createElement("div");
  questionExplanation.classList.add("question-explanation");
  const textArea = document.createElement("textarea");
  textArea.setAttribute("name", `question-explanation-${itemId}`);
  textArea.setAttribute("rows", "8");
  textArea.setAttribute(
    "placeHolder",
    "Soruyla ilgili ek açıklamalarınızı yazabilirsiniz."
  );
  questionExplanation.appendChild(textArea);
  questionContainer.appendChild(questionExplanation);

  //question-action-buttons
  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.classList.add("question-action-buttons-container");
  const deleteQuestion = document.createElement("div");
  deleteQuestion.classList.add("delete-question");
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash");
  deleteIcon.classList.add("action-button", "action-button-trash");
  const editQuestion = document.createElement("div");
  editQuestion.classList.add("edit-question");
  const editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "camera");
  editIcon.classList.add("action-button", "action-button-camera");
  deleteQuestion.appendChild(deleteIcon);
  editQuestion.appendChild(editIcon);
  actionButtonsContainer.appendChild(deleteQuestion);
  actionButtonsContainer.appendChild(editQuestion);
  questionContainer.appendChild(actionButtonsContainer);

  questionListContainer.appendChild(questionContainer);

  const clickImageSelection = () => {
    imageSelection.click();
  };
  questionImageContainer.addEventListener("click", clickImageSelection);
  showImage(
    imageSelection,
    userQuestionImage,
    addImageButton,
    imageText,
    questionImageContainer,
    clickImageSelection
  );

  addSelfDestructingEventListener(deleteQuestion, "click", async () => {
    const containerClassName = questionContainer.className
      .split(" ")[1]
      .split("-");
    const questionNumber = containerClassName[containerClassName.length - 1];
    console.log(containerClassName, questionNumber);
    const url = window.location.href.split("/");
    const postUrl = "/sorucozum/" + url[url.length - 1] + "/removeQuestion";
    const response = await axios.post(postUrl, {
      questionNumber: questionNumber,
    });
    console.log(response);
    questionListContainer.removeChild(questionContainer);
    adjustClassNames();
  });
};

const adjustClassNames = () => {
  const questionContainers = document.querySelectorAll(".question-container");
  questionContainers.forEach((questionContainer, idx) => {
    questionContainer.className = `question-container question-container-${
      idx + 1
    }`;
    const imageSelection = questionContainer.querySelector(".image-selection");
    imageSelection.setAttribute("name", `question-image-${idx + 1}`);
    const textArea = questionContainer.querySelector("textarea");
    textArea.setAttribute("name", `question-explanation-${idx + 1}`);
  });
};

/*
<div class="question-container question-container-1">
  <div class="question-image-container question-image-container-1">
    <input
      type="file"
      name="question-image-1"
      class="image-selection image-selection-1"
    />
    <ion-icon
      class="add-image-button add-image-button-1"
      name="camera"
    ></ion-icon>
    <div class="image-text image-text-1">Fotoğraf ekleyin</div>
    <img class="user-question-image user-question-image-1" src="" alt="" />
  </div>
  <div class="question-explanation question-explanation-1">
    <textarea
      name="questionExplanation-1"
      rows="8"
      placeholder="Soruyla ilgili ek açıklamalarınızı yazabilirsiniz."
    ></textarea>
  </div>
  <div class="question-action-buttons-container">
    <div class="delete-question delete-question-1">
      <ion-icon
        class="action-button action-button-trash action-button-trash-1"
        name="trash"
      ></ion-icon>
    </div>
    <div class="edit-question edit-question-1">
      <ion-icon
        class="action-button action-button-camera action-button-camera-1"
        name="camera"
      ></ion-icon>
    </div>
  </div>
</div>;
*/

/*
const createQuestionContainer = (itemId) => {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add(
    "question-container",
    `question-container-${itemId}`
  );

  //image container
  const questionImageContainer = document.createElement("div");
  questionImageContainer.classList.add(
    "question-image-container",
    `question-image-container-${itemId}`
  );
  const imageSelection = document.createElement("input");
  imageSelection.setAttribute("type", "file");
  imageSelection.setAttribute("name", `question-image-${itemId}`);
  imageSelection.classList.add("image-selection", `image-selection-${itemId}`);
  const addImageButton = document.createElement("ion-icon");
  addImageButton.setAttribute("name", "camera");
  addImageButton.classList.add(
    "add-image-button",
    `add-image-button-${itemId}`
  );
  const imageText = document.createElement("div");
  imageText.innerText = "Fotoğraf ekleyin";
  imageText.classList.add("image-text", `image-text-${itemId}`);
  const userQuestionImage = document.createElement("img");
  userQuestionImage.classList.add(
    "user-question-image",
    `user-question-image-${itemId}`
  );
  questionImageContainer.appendChild(imageSelection);
  questionImageContainer.appendChild(addImageButton);
  questionImageContainer.appendChild(imageText);
  questionContainer.appendChild(userQuestionImage);
  questionContainer.appendChild(questionImageContainer);

  //explanation-container
  const questionExplanation = document.createElement("div");
  questionExplanation.classList.add(
    "question-explanation",
    `question-explanation-${itemId}`
  );
  const textArea = document.createElement("textarea");
  textArea.setAttribute("name", `question-explanation-${itemId}`);
  textArea.setAttribute("rows", "8");
  textArea.setAttribute(
    "placeHolder",
    "Soruyla ilgili ek açıklamalarınızı yazabilirsiniz."
  );
  questionExplanation.appendChild(textArea);
  questionContainer.appendChild(questionExplanation);

  //question-action-buttons
  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.classList.add(
    "question-action-buttons-container",
    `question-action-buttons-container-${itemId}`
  );
  const deleteQuestion = document.createElement("div");
  deleteQuestion.classList.add("delete-question", `delete-question-${itemId}`);
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash");
  deleteIcon.classList.add(
    "action-button",
    "action-button-trash",
    `action-button-trash-${itemId}`
  );
  const editQuestion = document.createElement("div");
  editQuestion.classList.add("edit-question", `edit-question-${itemId}`);
  const editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "camera");
  editIcon.classList.add(
    "action-button",
    "action-button-camera",
    `action-button-camera-${itemId}`
  );
  deleteQuestion.appendChild(deleteIcon);
  editQuestion.appendChild(editIcon);
  actionButtonsContainer.appendChild(deleteQuestion);
  actionButtonsContainer.appendChild(editQuestion);
  questionContainer.appendChild(actionButtonsContainer);

  questionListContainer.appendChild(questionContainer);
};
*/
