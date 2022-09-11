const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `<header>
    <nav>
      <ul class="nav-list">
        <li class="navigation">
          <a class="navigation-link" href="">Özel Ders</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="">Soru Çözümü</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="">Profil</a>
        </li>
        <li class="navigation">
          <a href="/logout"class="navigation-link" href="">Çıkış</a>
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
  </div>`,
    styles: ["/css/questionLib.css"],
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
      rel="stylesheet"
    />`,
  });
};
