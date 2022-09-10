const layout = require("./layout");
const { getErrors } = require("./helpers");

module.exports = ({ errors }, isNew = "login") => {
  const emailErrors = getErrors(errors, "email");
  const passwordErrors = getErrors(errors, "password");
  const passConfErrors = getErrors(errors, "passConf");

  const errorParagraph = (error) => {
    if (error) {
      return '<p class="' + 'error-message">' + error + "</p>";
    }
  };

  return layout({
    content: `<div class="container">
  <main>
    <div class="img-container">
      <img
        class="pi-man"
        src="./img/undraw_mathematics_-4-otb.svg"
        alt=""
      />
    </div>
    <form method="POST" class="form-container">
      <div class="form-selection">
        <div class="choice">
          <input
            type="radio"
            name="isNew"
            id="already-user-radio"
            value="login"
            ${isNew === "login" ? `checked="checked"` : ""};
          />
          <label for="already-user-radio">Hesabım Var</label>
        </div>
        <div class="choice">
          <input
            type="radio"
            name="isNew"
            id="new-user-radio"
            value="newUser"
            ${isNew === "newUser" ? `checked="checked"` : ""};
          />
          <label for="new-user-radio">Yeni Kullanıcı</label>
        </div>
      </div>
      <div class="input-div">
        <input required type="email" name="email"class="text-input" placeholder="Mail adresi" />
        ${emailErrors ? errorParagraph(emailErrors) : ""}
      </div>
      <div class="input-div">
        <input required type="password" name="password" class="text-input" placeholder="Şifre" />
        ${passwordErrors ? errorParagraph(passwordErrors) : ""}
      </div>
      <div class="input-div password-repeat-div is-hiding">
        <input
          type="password"
          name="passConf"
          class="text-input password-repeat"
          placeholder="Şifrenizi tekrarlayın"
        />
        ${passConfErrors ? errorParagraph(passConfErrors) : ""}
      </div>
      <div class="signin-buttons is-hiding">
        <button type="submit" class="signin-btn">Kayıt Ol</button>
      </div>
      <div class="login-buttons">
        <button type="submit" class="login-btn">Giriş Yap</button>
        <button type="submit" class="forgot-password-btn">
          Şifremi Unuttum
        </button>
      </div>
    </form>
  </main>
  <footer>
    <div class="social-media">
      <ul class="social-media-list">
        <li>
          <img src="./img/icons8-facebook-purple.svg" alt="" />
          <span>Eğitim</span>
        </li>
        <li>
          <img src="./img/icons8-twitter-purple.svg" alt="" />
          <span>Eğitim</span>
        </li>
        <li>
          <img src="./img/icons8-instagram-purple.svg" alt="" />
          <span>Eğitim</span>
        </li>
      </ul>
    </div>
  </footer>
</div>
<script>
  const [radio_1, radio_2] = document.querySelectorAll("input[type=radio]");
  const signin_button = document.querySelector(".signin-buttons");
  const login_buttons = document.querySelector(".login-buttons");
  const password_repeat = document.querySelector(".password-repeat-div");
  const errorMessages= document.querySelectorAll(".error-message");
  console.log(errorMessages);
  radio_1.addEventListener("click", () => {
    login_buttons.classList.remove("is-hiding");
    signin_button.classList.add("is-hiding");
    password_repeat.classList.add("is-hiding");
    errorMessages.forEach(error=>error.style.display="none")
  });
  radio_2.addEventListener("click", () => {
    login_buttons.classList.add("is-hiding");
    signin_button.classList.remove("is-hiding");
    password_repeat.classList.remove("is-hiding");
    errorMessages.forEach(error=>error.style.display="none")
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
  
</script>`,
    styles: ["style.css"],
  });
};