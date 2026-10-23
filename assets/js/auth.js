const isProtected = true;

if (isProtected && sessionStorage.getItem("auth") !== "ok") {
  sessionStorage.setItem("redirect", location.href);

  const isEnglish = location.pathname.startsWith("/en/");

  location.href = isEnglish
    ? "/en/my-portfolio/password.html"
    : "/my-portfolio/password.html";
}
