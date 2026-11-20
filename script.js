const CONTACT_EMAIL = "wuilee99@gmail.com";

const navLinks = document.querySelectorAll(".nav a");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

// Mobile menu
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Fade sections in + highlight the current one in the sidebar
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    navLinks.forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
    );
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => observer.observe(s));

// Make sure the first section is visible immediately
sections[0].classList.add("visible");
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.1 });
sections.forEach(s => reveal.observe(s));

// Project filters
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.toggle("active", c === chip));
  const f = chip.dataset.filter;
  cards.forEach(card => card.classList.toggle("hidden", f !== "all" && !card.dataset.tags.includes(f)));
}));

// Contact form: opens the visitor's email app with the message filled in.
// (Swap for Formspree/Netlify Forms later if you want messages without a mail client.)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  document.getElementById("formNote").textContent = "Opening your email app…";
});

document.getElementById("year").textContent = new Date().getFullYear();
