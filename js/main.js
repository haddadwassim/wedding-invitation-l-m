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
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  fields.days.textContent = new Intl.NumberFormat("ar-DZ").format(days);
  fields.hours.textContent = formatNumber(hours);
  fields.minutes.textContent = formatNumber(minutes);
  fields.seconds.textContent = formatNumber(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}
