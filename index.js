const [radio_1, radio_2] = document.querySelectorAll("input[type=radio]");
const signin_button = document.querySelector(".signin-buttons");
const login_buttons = document.querySelector(".login-buttons");
const password_repeat = document.querySelector(".password-repeat-div");

radio_1.addEventListener("click", () => {
  login_buttons.classList.remove("is-hiding");
  signin_button.classList.add("is-hiding");
  password_repeat.classList.add("is-hiding");
});
radio_2.addEventListener("click", () => {
  login_buttons.classList.add("is-hiding");
  signin_button.classList.remove("is-hiding");
  password_repeat.classList.remove("is-hiding");
});
