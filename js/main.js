const weddingDate = new Date("2026-10-23T00:00:00+01:00");
const countdown = document.querySelector(".countdown__units");
const countdownComplete = document.querySelector(".countdown__complete");
const fields = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
  seconds: document.querySelector('[data-countdown="seconds"]'),
};

const formatNumber = (value) => new Intl.NumberFormat("ar-DZ", {
  minimumIntegerDigits: 2,
  useGrouping: false,
}).format(value);

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();

  if (remaining <= 0) {
    countdown.hidden = true;
    countdownComplete.hidden = false;
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  fields.days.textContent = new Intl.NumberFormat("ar-DZ").format(Math.floor(totalSeconds / 86400));
  fields.hours.textContent = formatNumber(Math.floor((totalSeconds % 86400) / 3600));
  fields.minutes.textContent = formatNumber(Math.floor((totalSeconds % 3600) / 60));
  fields.seconds.textContent = formatNumber(totalSeconds % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const invitationGate = document.querySelector(".invitation-gate");
const invitationButton = document.querySelector(".invitation-gate__card");
const invitationContent = document.querySelector("#invitation-content");

function openInvitation() {
  if (invitationGate.classList.contains("is-opening")) return;

  window.scrollTo({ top: 0, behavior: "auto" });
  invitationGate.classList.add("is-opening");
  invitationGate.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    invitationGate.hidden = true;
    document.body.classList.remove("invitation-locked");
    window.scrollTo({ top: 0, behavior: "auto" });
    invitationContent.focus({ preventScroll: true });
  }, reduceMotion ? 20 : 1280);
}

invitationButton.addEventListener("click", openInvitation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !invitationGate.hidden) openInvitation();
});

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
  });

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    revealObserver.observe(item);
  });
}
