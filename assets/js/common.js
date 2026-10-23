// 共通パーツ読み込み
window.addEventListener("DOMContentLoaded", () => {
  const lang = location.pathname.startsWith("/en/") ? "en" : "ja";

  fetch(`/assets/includes/${lang}/header.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;

      setupLangSwitch();
      setupMobileMenu();
    });

  fetch("/assets/includes/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
      setupBackToTop();
    });
});

function setupLangSwitch() {
  const langNav = document.getElementById("lang_nav");
  if (!langNav) return;

  const enBtn = langNav.querySelector(".en");
  const jpBtn = langNav.querySelector(".ja");
  if (!enBtn || !jpBtn) return;

  const currentPath = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;
  const isEnglish = currentPath === "/en/" || currentPath.startsWith("/en/");

  enBtn.classList.toggle("current", isEnglish);
  jpBtn.classList.toggle("current", !isEnglish);

  enBtn.addEventListener("click", function () {
    if (!isEnglish) {
      const newPath = "/en" + currentPath + search + hash;
      window.location.href = new URL(newPath, window.location.origin).href;
    }
  });

  jpBtn.addEventListener("click", function () {
    if (isEnglish) {
      const newPath = currentPath.replace(/^\/en/, "") + search + hash;
      window.location.href = new URL(newPath, window.location.origin).href;
    }
  });
}

document.addEventListener("click", (e) => {
  const backToTop = e.target.closest("#back-to-top");

  if (!backToTop) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
function setupBackToTop() {
  const btn = document.getElementById("back-to-top");

  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".site-nav");

  if (!hamburger || !nav) return;

  /* -------------------------------------------------------
     Toggle menu
  ------------------------------------------------------- */

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("is-open");

    nav.classList.toggle("is-open", isOpen);

    hamburger.setAttribute("aria-expanded", isOpen);

    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    /*
     * メニューを開いている間は
     * 背景ページをスクロールさせない
     */
    document.body.classList.toggle("menu-open", isOpen);
  });

  /* -------------------------------------------------------
     Close when clicking navigation link
  ------------------------------------------------------- */

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-open");

      nav.classList.remove("is-open");

      hamburger.setAttribute("aria-expanded", "false");

      hamburger.setAttribute("aria-label", "Open menu");

      document.body.classList.remove("menu-open");
    });
  });

  /* -------------------------------------------------------
     Close with Escape
  ------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      hamburger.classList.remove("is-open");

      nav.classList.remove("is-open");

      hamburger.setAttribute("aria-expanded", "false");

      hamburger.setAttribute("aria-label", "Open menu");

      document.body.classList.remove("menu-open");
    }
  });
}
