// Script Header
const menu = document.querySelector(".uil-apps");
const close = document.querySelector(".close");
const HeaderMobile = document.querySelector(".pop-header-m");
const PopHeader = document.querySelector(".pop-header-m");

menu.addEventListener("click", () => {
  HeaderMobile.classList.add("active");
});

close.addEventListener("click", () => {
  HeaderMobile.classList.remove("active");
});

PopHeader.addEventListener("click", (e) => {
  if (e.target.tagName == "I" || e.target.tagName == "A") {
    HeaderMobile.classList.remove("active");
  }
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".mobile");
  if (window.scrollY > 0) {
    header.style.boxShadow = "4px 4px 12px rgba(0,0,0, 0.60)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Darck Theme
var isColorChanged = false;

var buttons = document.querySelectorAll(".uil-moon");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (isColorChanged) {
      document.documentElement.style.setProperty("--color-black", "#342A24");
      document.documentElement.style.setProperty("--color-gray", "#616063");
      document.documentElement.style.setProperty("--color-fundo", "#FBFBFE");
      document.documentElement.style.setProperty("--color-footer", "#dfdfe9");
      document.documentElement.style.setProperty("--color-bgfooter", "#644DC3");
    } else {
      document.documentElement.style.setProperty("--color-black", "#D3C4CB");
      document.documentElement.style.setProperty("--color-gray", "#D1CED8");
      document.documentElement.style.setProperty("--color-fundo", "#191423");
      document.documentElement.style.setProperty("--color-footer", "#161526");
      document.documentElement.style.setProperty(
        "--color-bgfooter",
        "#644dc370"
      );
    }
    isColorChanged = !isColorChanged;
  });
});

// ANIMAÇÃO
window.addEventListener("load", () => {
  window.sr = ScrollReveal({ reset: true });

  var slideUp = {
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
  };

  // MAIN
  ScrollReveal().reveal(".icones", slideUp);
  ScrollReveal().reveal("#text-main", slideUp);
  ScrollReveal().reveal(".scorrer", slideUp);
  ScrollReveal().reveal(".img-p", slideUp);
  ScrollReveal().reveal(".btn-main", slideUp);

  var slideLeft = {
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
  };

  // HEADER
  ScrollReveal().reveal(".head", slideLeft);
});

// SCROLL
document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopButton = document.getElementById("scroll-to-top");

  if (!scrollToTopButton) {
    console.error("Element with ID 'scroll-to-top' not found.");
    return;
  }

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  };
});

function scrollToTop() {
  document.body.scrollTop = 0; // Para navegadores mais antigos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
}

// Toda A Configuração Para Cair As Notficações No Email
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySucces() {
    this.form.innerHTML += this.settings.success;
  }

  displayError() {
    this.form.innerHTML += this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySucces();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
