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
      <div class="dropdown">
            <div class="dropdown-header">
              <div class="dropdown-text">Üyelik tipi seçiniz</div>
              <div class="dropdown-arrow"><ion-icon name="caret-back-circle-outline"></ion-icon></div>
            </div>
            <div class="choices">
              <input
                type="radio"
                class="account-type"
                name="accountType"
                id="student"
                checked="checked"
                value="student"
              />
              <label for="student" class="account-choice">Öğrenci</label>
              <input
                type="radio"
                class="account-type"
                name="accountType"
                value="teacher"
                id="teacher"
              />
              <label for="teacher" class="account-choice">Öğretmen</label>
            </div>
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
<script src="/js/signin.js"></script>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>`,
    styles: ["/css/style.css"],
  });
};
