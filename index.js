const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="style.css" />
      <title>Eğitim</title>
    </head>
    <body>
      <div class="container">
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
                  checked="checked"
                />
                <label for="already-user-radio">Hesabım Var</label>
              </div>
              <div class="choice">
                <input
                  type="radio"
                  name="isNew"
                  id="new-user-radio"
                  value="newUser"
                />
                <label for="new-user-radio">Yeni Kullanıcı</label>
              </div>
            </div>
            <div class="input-div">
              <input type="email" name="email"class="text-input" placeholder="Mail adresi" />
            </div>
            <div class="input-div">
              <input type="password" name="password" class="text-input" placeholder="Şifre" />
            </div>
            <div class="input-div password-repeat-div is-hiding">
              <input
                type="password"
                name="passConf"
                class="text-input password-repeat"
                placeholder="Şifrenizi tekrarlayın"
              />
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
      </script>
    </body>
  </html>
  `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("We are working on it");
});

app.listen(3000, () => {
  console.log("Listening");
});
