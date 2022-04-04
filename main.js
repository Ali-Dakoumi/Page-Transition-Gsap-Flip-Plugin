gsap.registerPlugin(Flip);
const img = document.querySelector(".img");
const fullscreen = document.querySelector(".fullscreen");
const item = document.querySelector(".item");
const infos = document.querySelectorAll(".info");
const items = document.querySelector(".class");
var targets = gsap.utils.toArray(".class");
const fullScreen = gsap.utils.toArray(".fullScreened");
const viewport = document.getElementById("viewport");

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
    duration: 1,
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

function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(document.querySelector("#viewport"), {
    damping: 0.04,
  });
  // remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();
}

bodyScrollBar = Scrollbar.init(document.querySelector("#viewport"), {
  damping: 0.04,
});
function fixed(params) {
  const fixedElem = document.getElementsByClassName("fullscreen")[0];

  bodyScrollBar.addListener((status) => {
    const offset = status.offset;

    fixedElem.style.top = offset.y + "px";
  });
}
barba.hooks.before(() => {
  bodyScrollBar.update();
  bodyScrollBar.scrollTo(0, 0);
  initSmoothScrollbar();
});
barba.hooks.after(() => {
  initSmoothScrollbar();
});
barba.init({
  debug: true,
  transitions: [
    {
      name: "from-home-transition",
      to: {
        namespace: ["about"],
      },
      once({ next }) {
        initSmoothScrollbar();
      },
      async leave({ current }) {
        const hometitle = document.querySelector(".hometitle");
        const infos = document.querySelectorAll(".info");
        const img = document.querySelector(".img");
        const tl = gsap.timeline();
        await tl.to(hometitle, 0.5, { opacity: 0 }).to(
          infos,
          0.5,
          {
            opacity: 0,
          },
          "-=0.5"
        );
        await Flip.fit(img, ".fullscreen", {
          duration: 1.4,
          ease: Power4.easeInOut,
          absolute: false,
          clearProps: "all",
        });
        await console.log(img.clientHeight);
      },

      enter({ next }) {
        enterAnimation(next.container, 0);
        initSmoothScrollbar();
      },
    },
    {
      name: "to-home-transition",
      to: {
        namespace: ["home"],
      },
      enter({ next }) {
        const fullscreen = document.querySelector(".fullscreen");
        const item = document.querySelector(".item");
        const img = document.querySelector(".img");
        const items = document.querySelectorAll(".class");
        const hometitle = document.querySelector(".hometitle");
        const infos = document.querySelectorAll(".info");
        gsap.set(next.container, {
          position: "fixed",
          inset: "0",
          zIndex: "-1",
        });
        gsap.set(hometitle, { opacity: 0 });
        gsap.set(
          infos,
          {
            opacity: 0,
          },
          "-=0.5"
        );

        console.log(next.container.clientHeight, "new container height");
        console.log(img.clientHeight, "img height");
        gsap.to(next.container, 0, {
          opacity: 1,
          onComplete: () => {
            console.log(next.container.offsetTop);
          },
        });
        const newstate = Flip.getState(img);
        (img.parentNode === item ? fullscreen : item).appendChild(img);
        Flip.fit(img, ".item", {
          duration: 1,
          ease: Power4.easeInOut,
          absolute: true,
          clearProps: "all",
        });
        gsap.to(hometitle, 0.5, { opacity: 1, delay: 0.85 });
        gsap.to(infos, 0.5, {
          opacity: 1,
          delay: 0.85,
        });
      },
      async leave({ current }) {
        await bodyScrollBar.scrollTo(0, 0);
        await leaveAnimationAbout(current.container);
      },
      once({ next }) {
        initSmoothScrollbar();
      },
    },
  ],
});
