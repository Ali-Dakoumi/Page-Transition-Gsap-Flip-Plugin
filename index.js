const { default: gsap } = require("gsap");

gsap.registerPlugin(Flip);

const fake = document.querySelector(".fake"),
  item = document.querySelector(".item"),
  fullscreen = document.querySelector(".fullscreen");
gsap.set(fake, { opacity: 1 });
const state = Flip.getState(fake);
(fake.parentNode === item ? fullscreen : item).appendChild(fake);
about.classList.toggle("bigimage");
Flip.to(state, { duration: 1, ease: "power1.inOut", scale: true });
// Flip.from(state, { duration: 1, ease: "power1.inOut", scale: true, delay: 1 });
