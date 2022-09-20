const layout = require("./layout");

module.exports = (testsPercentage) => {
  return layout({
    content: `<header>
    <nav>
      <ul class="nav-list">
        <li class="navigation">
          <a class="navigation-link" href="">Özel Ders</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="/sorucozum">Soru Çözümü</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="">Profil</a>
        </li>
        <li class="navigation">
          <a href="/logout"class="navigation-link" href="/logout">Çıkış</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="hero">
    <div class="hero-container">
      <div class="upper-body">
        <img
          class="main-img"
          src="./img/undraw_online_test_re_kyfx.svg"
          alt=""
        />
        <div class="main-text">
          <h2>Senin İçin Özenle Hazırlandı</h2>
          <ul class="recommendation-list">
            <li class="recommendations">
              <img
                class="checkmark"
                src="./img/checkmark.svg"
                alt=""
              />
              <p>Takıldığın soruların çözümünü öğrendiğinden emin ol.</p>
            </li>
            <li class="recommendations">
              <img
                class="checkmark"
                src="./img/checkmark.svg"
                alt=""
              />
              <p>Soruları süre sınırıyla çözmeye özen göster.</p>
            </li>
            <li class="recommendations">
              <img
                class="checkmark"
                src="./img/checkmark.svg"
                alt=""
              />
              <p>Çözemediğin sorular olduğunda telaşlanma, olur öyle 😊.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="lectures-container">
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
        <ul class="lecture-list"></ul>
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
    styles: ["/css/questionLib.css"],
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
      rel="stylesheet"
    />`,
  });
};
