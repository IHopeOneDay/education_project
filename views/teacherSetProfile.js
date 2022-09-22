const layout = require("./layout");

module.exports = () => {
  return layout({
    font: `<link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
          rel="stylesheet"
        />`,
    styles: ["/css/teacherSetProfile.css"],
    content: `<div class="container">
    <div class="form-container">
      <div class="img-container">
        <img src="/img/undraw_profile_details_re_ch9r.svg" alt="" />
      </div>
      <form
        action="/ogretmen/setProfile"
        method="POST"
        enctype="multipart/form-data"
      >
        <input
          class="name-field"
          type="text"
          name="name"
          placeholder="Adınız"
        />
        <input
          class="name-field"
          type="text"
          name="surname"
          placeholder="Soyadınız"
        />
        <div class="image-selection-container">
          <div class="image-selection-text">
            Lütfen profil fotoğrafınızı seçiniz
          </div>
          <div class="image-selection-inner-container">
            <input
              type="radio"
              name="image"
              value="maleAvatar"
              id="male-avatar"
            />
            <label for="male-avatar"></label>
            <input
              type="radio"
              name="image"
              value="femaleAvatar"
              id="female-avatar"
            />
            <label for="female-avatar"></label>
            <div class="exclusive-avatar-container">
              <input
                type="radio"
                name="image"
                value="exclusiveAvatar"
                id="exclusive-avatar"
              />
              <label class="exclusive-avatar-label" for="exclusive-avatar"
                >Kendim seçeceğim</label
              >
              <div class="image-name"></div>
              <input
                class="file-selection"
                type="file"
                name="avatar"
                id=""
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div class="radio-container">
          <div class="profession-text">Branşınız nedir?</div>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="turkish"
            id="turkish"
          />
          <label for="turkish">Türkçe</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="math"
            id="math"
          />
          <label for="math">Matematik</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="geometry"
            id="geometry"
          />
          <label for="geometry">Geometri</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="chem"
            id="chem"
          />
          <label for="chem">Kimya</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="phys"
            id="phys"
          />
          <label for="phys">Fizik</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="hist"
            id="hist"
          />
          <label for="hist">Tarih</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="geography"
            id="geography"
          />
          <label for="geography">Coğrafya</label>
          <input
            class="profession-radio"
            type="radio"
            name="profession"
            value="english"
            id="english"
          />
          <label for="english">İngilizce</label>
        </div>
        <div class="price-container">
          <label for="credits-per-question">Soru çözüm ücretiniz:</label>
          <div class="price-inner-container">
            <input
              id="credits-per-question"
              type="text"
              name="creditsPerQuestion"
              value="0"
              readonly
            />
            <div class="price-buttons">
              <div class="increase-price">+</div>
              <div class="decrease-price">-</div>
            </div>
          </div>
        </div>
        <button class="submit" type="submit">Profili Kaydet</button>
      </form>
    </div>
  </div>
  
  <script>
    const exclusiveAvatarRadio = document.querySelector(
      ".exclusive-avatar-label"
    );
    const fileSelectionButton = document.querySelector(".file-selection");
    const imageNameText = document.querySelector(".image-name");
    const incPriceButton = document.querySelector(".increase-price");
    const decPriceButton = document.querySelector(".decrease-price");
    const priceInput = document.querySelector("#credits-per-question");
    incPriceButton.addEventListener("click", () => {
      priceInput.value = parseInt(priceInput.value) + 1;
    });
    decPriceButton.addEventListener("click", () => {
      if (priceInput.value >= 1) {
        priceInput.value -= 1;
      }
    });
  
    exclusiveAvatarRadio.addEventListener("click", () => {
      fileSelectionButton.click();
    });
    fileSelectionButton.addEventListener("change", (e) => {
      imageNameText.innerText = e.target.files[0].name;
    });
  </script>`,
  });
};
