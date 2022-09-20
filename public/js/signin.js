const [radio_1, radio_2] = document.querySelectorAll("input[type=radio]");
const signin_button = document.querySelector(".signin-buttons");
const login_buttons = document.querySelector(".login-buttons");
const password_repeat = document.querySelector(".password-repeat-div");
const errorMessages = document.querySelectorAll(".error-message");
const dropdown = document.querySelector(".dropdown");
const dropdownHeader = document.querySelector(".dropdown-header");
const choices = document.querySelector(".choices");
const dropdownArrow = document.querySelector(".dropdown-arrow");

radio_1.addEventListener("click", () => {
  login_buttons.classList.remove("is-hiding");
  signin_button.classList.add("is-hiding");
  password_repeat.classList.add("is-hiding");
  errorMessages.forEach((error) => (error.style.display = "none"));
});
radio_2.addEventListener("click", () => {
  login_buttons.classList.add("is-hiding");
  signin_button.classList.remove("is-hiding");
  password_repeat.classList.remove("is-hiding");
  errorMessages.forEach((error) => (error.style.display = "none"));
});
window.addEventListener("load", () => {
  if (radio_1.checked) {
    login_buttons.classList.remove("is-hiding");
    signin_button.classList.add("is-hiding");
    password_repeat.classList.add("is-hiding");
  }
  if (radio_2.checked) {
    login_buttons.classList.add("is-hiding");
    signin_button.classList.remove("is-hiding");
    password_repeat.classList.remove("is-hiding");
  }
});

dropdownHeader.addEventListener("click", () => {
  if (choices.clientHeight) {
    choices.style.height = 0;
    dropdownArrow.classList.remove("rotated");
    return;
  }
  choices.style.height = choices.scrollHeight + "px";
  dropdownArrow.classList.add("rotated");
});
