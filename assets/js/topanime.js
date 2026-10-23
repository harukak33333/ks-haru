// ==========================
// テキスト表示アニメーション
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const typing = document.getElementById("typing");
  const pen = document.querySelector(".pen");

  // 表示する文章
  const source = document.getElementById("typing-source");
  const text = source.textContent.trim();

  // タイピング速度
  const writeSpeed = 45;

  // ペンが先に動く時間
  const penLead = 30;

  let index = 0;

  // 初期位置（CSSと合わせる）
  const baseLeft = 56;
  const baseTop = 14;

  // ペンの微妙な揺れ
  function randomOffset() {
    return {
      x: (Math.random() - 0.5) * 3,
      y: (Math.random() - 0.5) * 2,
    };
  }

  function typeCharacter() {
    if (index >= text.length) {
      finishWriting();
      return;
    }

    const char = text[index];

    // 改行
    if (char === "\n") {
      typing.appendChild(document.createElement("br"));
      index++;
      setTimeout(typeCharacter, writeSpeed * 2);
      return;
    }

    // 空白
    if (char === " ") {
      typing.appendChild(document.createTextNode(" "));
      index++;
      setTimeout(typeCharacter, writeSpeed);
      return;
    }

    // 透明状態で追加
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = "0";

    typing.appendChild(span);

    // 描画後に位置取得
    requestAnimationFrame(() => {
      const charRect = span.getBoundingClientRect();
      const typingRect = typing.getBoundingClientRect();

      const pos = randomOffset();

      const penHeight = pen.offsetHeight;
      const PEN_Y_OFFSET = -penHeight * 0.9;

      const x = charRect.left - typingRect.left + pos.x;
      const y = charRect.top - typingRect.top + pos.y + PEN_Y_OFFSET;

      // ペン移動
      pen.style.left = `calc(${baseLeft}% + ${x}px)`;
      pen.style.top = `calc(${baseTop}% + ${y}px)`;
      pen.style.transform = "rotate(15deg)";

      // 少し遅れて文字表示
      setTimeout(() => {
        span.style.opacity = "1";
      }, penLead);
    });

    index++;

    // 句読点は少し止まる
    let delay = writeSpeed;

    if (".,!?、。".includes(char)) {
      delay += 180;
    }

    setTimeout(typeCharacter, delay);
  }

  // 書き終わり

  function finishWriting() {
    pen.style.transition = "left .7s ease, top .7s ease, transform .7s ease";

    pen.style.left = "60%";
    pen.style.top = "60%";
    pen.style.transform = "rotate(80deg)";
  }

  // 少し待って開始
  setTimeout(typeCharacter, 600);
});

// 時計
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

// hour.style.transform = `rotate(${deg}deg)`;

function updateClock() {
  const now = new Date();

  const tokyo = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
  );

  const h = tokyo.getHours() % 12;
  const m = tokyo.getMinutes();
  const s = tokyo.getSeconds();

  hour.style.transform = `rotate(${h * 30 + m * 0.5}deg)`;

  minute.style.transform = `rotate(${m * 6}deg)`;

  second.style.transform = `rotate(${s * 6}deg)`;
}

updateClock();

setInterval(updateClock, 1000);

// スマホ
const screens = document.querySelectorAll(".phone .phone-screen img");

let current = 0;

setInterval(() => {
  screens[current].classList.remove("active");

  current++;

  if (current >= screens.length) {
    current = 0;
  }

  screens[current].classList.add("active");
}, 2500);

// スクロールアニメーション

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  // gsap code here!
});

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    // scrub: 1,
    scrub: isMobile ? 0.03 : 1,
    invalidateOnRefresh: true,
  },
});

/* =========================
   01
   Hero全体を拡大
========================= */

heroTimeline.to(".hero-stage", {
  scale: 6,
  ease: "none",
  duration: 4,
});

/* =========================
   02
   拡大したノートを見せる
========================= */

heroTimeline.to(
  {},
  {
    duration: 1,
  },
);

/* =========================
   03
   周囲のオブジェクトを消す
========================= */

heroTimeline.to(".hero-object", {
  autoAlpha: 0,
  duration: 1,
});

/* =========================
   04
   ノートの紹介文を消す
========================= */

heroTimeline.to(".hero-intro", {
  autoAlpha: 0,
  duration: 1,
});

heroTimeline.to(
  ".pen",
  {
    autoAlpha: 0,
    duration: 0.5,
  },
  "<",
);

/* =========================
   05
   Works sectionを
   右ページ位置から出現させる
========================= */

heroTimeline.fromTo(
  ".works",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 1.5,
  },
  "-=0.7",
);
/* =========================
   06
   Heroをフェードアウト
========================= */

heroTimeline.to(".hero-stage", {
  autoAlpha: 0,
  duration: 0.4,
});
/* =========================
07
Header / Footer
========================= */

// Hero中は非表示
document.querySelector("#header")?.classList.add("is-hidden");
document.querySelector("#footer")?.classList.add("is-hidden");

// Worksに入ったら表示
ScrollTrigger.create({
  trigger: ".works",
  start: "top 50%",

  onEnter: () => {
    document.querySelector("#header")?.classList.remove("is-hidden");

    document.querySelector("#footer")?.classList.remove("is-hidden");
  },

  onLeaveBack: () => {
    document.querySelector("#header")?.classList.add("is-hidden");

    document.querySelector("#footer")?.classList.add("is-hidden");

    // SPメニューを閉じる

    const hamburger = document.querySelector(".hamburger");

    const nav = document.querySelector(".site-nav");

    hamburger?.classList.remove("is-open");

    nav?.classList.remove("is-open");

    hamburger?.setAttribute("aria-expanded", "false");

    hamburger?.setAttribute("aria-label", "Open menu");

    document.body.classList.remove("menu-open");
  },
});

/* =========================
   #works直接アクセス
========================= */

window.addEventListener("load", () => {
  if (window.location.hash !== "#works") {
    return;
  }

  const works = document.querySelector("#works");

  if (!works) {
    return;
  }

  ScrollTrigger.refresh();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: works.offsetTop,
        behavior: "auto",
      });
    });
  });
});
