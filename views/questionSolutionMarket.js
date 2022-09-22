const layout = require("./layout");

module.exports = ({ credits = 0, teachers = [] }) => {
  teachers = teachers.map((teacher) => {
    console.log(teacher);
    let stars;
    if (teacher.stars === null) {
      stars = 0;
    } else {
      stars = teacher.stars.valueOf();
    }
    let starsTemplate = ``;
    let i = 1;
    while (i < 6) {
      if (stars >= 1) {
        starsTemplate += `<div class="star">★</div>`;
        stars -= 1;
      } else if (stars > 0) {
        starsTemplate += `<div class="star" style="background-size: 100%;
        background-repeat: repeat;
        background-image: linear-gradient(to right, #574ff5 ${
          stars * 100 + "%"
        }, white ${stars * 100 + "%"} 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;">★</div>`;
        stars -= 1;
      } else {
        starsTemplate += `<div class="star" style="color:white">★</div>`;
      }
      i++;
    }
    return `<div class="teacher-container">
    <div class="teacher-information">
      <div class="teacher-avatar">
        <img src="/${teacher.imgPath}" alt="" />
      </div>
      <div class="teacher-information-text">
        <div class="teacher-name">${teacher.name}</div>
        <div class="teacher-stars">
          ${starsTemplate}
          <div class="star-text">${teacher.stars || "Değerlendirilmemiş"}</div>
        </div>
      </div>
    </div>
    <div class="question-action-container">
      <div class="question-price">Soru başına ${
        teacher.creditsPerQuestion
      } kredi</div>
      <a href="/sorucozum/${teacher._id}" class="ask-question-button">
        Soru Sor
      </a>
    </div>
  </div>`;
  });

  teachers = teachers.join("");

  return layout({
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
      rel="stylesheet"
    />`,
    styles: ["/css/questionSolutionMarket.css"],
    content: `<header>
    <a href="/dersler" class="logo-container"></a>
    <nav>
      <ul class="nav-list">
        <li class="navigation">
          <a class="navigation-link" href="">Özel Ders</a>
        </li>
        <li class="navigation">
          <a href="/sorucozum"class="navigation-link" href="">Soru Çözümü</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="/dersler">Profil</a>
        </li>
        <li class="navigation">
          <a class="navigation-link" href="/logout">Çıkış</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <div class="left-part">
      <div class="hero-personal">
        <div class="questions-asked">
          <div class="questions-asked-text">Sorulan Sorular</div>
          <div class="questions-asked-arrow">
            <ion-icon name="caret-back-circle-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div class="hero-teachers">
        ${teachers}
      </div>
    </div>
    <div class="right-part">
      <div class="user-credits-container">
        <div class="user-credits-amount">${credits}</div>
        <div class="user-credits-text">Kredi</div>
        <a href="" class="user-credits-buy">Kredi Al</a>
      </div>
    </div>
  </div>
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>`,
  });
};
