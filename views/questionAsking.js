const layout = require("./layout");

module.exports = ({ credits = 0, teacher = null }) => {
  return layout({
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
      rel="stylesheet"
    />`,
    styles: ["/css/questionAsking.css"],
    content: `<header>
    <a href="/dersler" class="logo-container"></a>
    <nav>
      <ul class="nav-list">
        <li class="navigation">
          <a class="navigation-link" href="">Özel Ders</a>
        </li>
        <li class="navigation">
          <a href="/sorucozum" class="navigation-link" href="">Soru Çözümü</a>
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
    <div class="left-body">
      <div class="upper-container">
        <div class="upper-text">Sorulacak Sorular</div>
        <div class="add-new-question">
          <ion-icon name="add-circle"></ion-icon>
        </div>
      </div>
      <form id="form1" method="POST" action="/sorucozum/${teacher._id}/finishOrder" enctype="multipart/form-data" class="question-list-container">
      </form>
    </div>
    <div class="right-body">
      <div class="user-credits-container">
        <div class="user-credits-amount">${credits}</div>
        <div class="user-credits-text">Kredi</div>
        <a class="get-credits" href="/krediAl">Kredi Al</a>
      </div>
      <div class="order-summary-container">
        <div class="teacher-information">
          <div class="teacher-img">
            <img src="/${teacher.imgPath}" alt="" />
          </div>
          <div class="teacher-text">
            <div class="teacher-name">${teacher.name}</div>
            <div class="price-per-question">Soru başına 3 kredi</div>
          </div>
        </div>
        <div class="total-price-container">
          <div class="question-number">1</div>
          <div class="cross">X</div>
          <div class="question-price">${teacher.creditsPerQuestion}</div>
          <div class="equal">=</div>
          <div class="total-price">
            <div class="price-amount">${teacher.creditsPerQuestion}</div>
            <div class="price-text">Kredi</div>
          </div>
        </div>
        <div class="finish-order">
          <button form="form1" class="finish-order-button" type="submit">
            Siparişi Tamamla
          </button>
          <ion-icon class="card-icon" name="card"></ion-icon>
        </div>
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
  ></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="/js/questionAsking.js"></script>`,
  });
};
