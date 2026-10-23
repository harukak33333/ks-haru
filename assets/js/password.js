const PASSWORD = "0)£8q1*Af1"; // 毎月ここだけ変更

function login() {
  const input = document.getElementById("password").value;

  if (input === PASSWORD) {
    sessionStorage.setItem("auth", "ok");

    const redirect = sessionStorage.getItem("redirect");

    if (redirect) {
      location.href = redirect;
    } else {
      location.href = "/my-portfolio/";
    }
  } else {
    document.getElementById("error").textContent =
      "You entered wrong password. Please try again.";
  }
}
