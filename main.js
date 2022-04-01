gsap.registerPlugin(Flip);
const img = document.querySelector(".img");
const fullscreen = document.querySelector(".fullscreen");
const item = document.querySelector(".item");
const infos = document.querySelectorAll(".info");

function homeEnter(container) {
  const state = Flip.getState(img);
  (img.parentNode === item ? fullscreen : item).appendChild(img);
  Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
    delay: 1,
    absolute: true,
  });
}
const leavingHome = (container) => {
  const state = Flip.getState(img);
  return Flip.fit(img, ".fullscreen", {
    duration: 6,
    ease: Expo.easeInOut,
    absolute: false,
    clearProps: "all",
  });
};
const enterAnimation = (container, time) => {
  const tl = gsap.timeline();
  tl.from("#title", 0.7, { opacity: 0, y: 150, ease: Expo.easeInOut });
  return tl;
};
const leaveAnimationAbout = (container) => {
  return gsap.to(container, 0, {
    autoAlpha: 0,
  });
};

barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: "from-home-transition",
      to: {
        namespace: ["about"],
      },
      async leave({ current }) {
        const hometitle = document.querySelector(".hometitle");
        const infos = document.querySelectorAll(".info");
        const img = document.querySelector(".item > img");
        const tl = gsap.timeline();
        await tl.to(hometitle, 0.5, { opacity: 0 }).to(
          infos,
          0.5,
          {
            opacity: 0,
          },
          "-=0.5"
        );
        await leavingHome(current.container);
      },

      enter({ next }) {
        enterAnimation(next.container, 0);
      },
    },
    {
      name: "to-home-transition",
      to: {
        namespace: ["home"],
      },
      async leave({ current }) {
        await leaveAnimationAbout(current.container);
      },
      enter({ next }) {
        const fullscreen = document.querySelector(".fullscreen");
        const item = document.querySelector(".item");
        const img = document.querySelector(".img");
        gsap.to(next.container, 0, {
          opacity: 1,
        });
        const newstate = Flip.getState(img);
        (img.parentNode === item ? fullscreen : item).appendChild(img);
        Flip.to(newstate, {
          duration: 1,
          ease: "power1.inOut",
          delay: 1,
          absolute: true,
        });
      },
    },
  ],
});
