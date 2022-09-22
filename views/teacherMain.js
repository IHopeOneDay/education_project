const layout = require("./layout");

module.exports = ({ isProfileSet = false }) => {
  if (!isProfileSet) {
    return layout({
      font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
        rel="stylesheet"
      />`,
      styles: ["/css/teacherMainNotSet.css"],
      content: `<div class="container">
      <div class="img-container">
        <img src="/img/undraw_warning_re_eoyh.svg" alt="" />
      </div>
      <div class="text-container">
        <div class="warning">
          Profil bilgilerinizi tamamlamadan soru çözüm sayfasında
          listelenemezsiniz.
        </div>
        <div class="action-buttons">
          <a href="/ogretmen/profile" class="set-profile">Profili Ayarla</a>
          <a href="/logout" class="logout">Çıkış Yap</a>
        </div>
      </div>
    </div>`,
    });
  }
};
