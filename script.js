const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const words = ["Aspiring IT Professional", "UI/UX Enthusiast", "Software Developer"];
const typed = document.querySelector(".typed-text");
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 75);
  } else if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1300);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 40);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Certificate preview modal
const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalClose = document.querySelector(".certificate-modal-close");

document.querySelectorAll(".certificate-card").forEach(card => {
  card.addEventListener("click", () => {
    certificateModalImage.src = card.dataset.certificate;
    certificateModal.classList.add("open");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeCertificateModal() {
  certificateModal.classList.remove("open");
  certificateModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

certificateModalClose.addEventListener("click", closeCertificateModal);
certificateModal.addEventListener("click", event => {
  if (event.target === certificateModal) closeCertificateModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && certificateModal.classList.contains("open")) {
    closeCertificateModal();
  }
});
