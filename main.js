gsap.registerPlugin(Flip);
const about = document.querySelector(".about");
const contact = document.querySelector(".contact");
const services = document.querySelector(".services");
const title = document.querySelector("#title");
const hometitle = document.querySelector(".hometitle");
const infos = document.querySelectorAll(".info");
const img = document.querySelector(".item > img");

const state = Flip.getState(about);
const state1 = Flip.getState(contact);
const state2 = Flip.getState(services);

var textWrapper = document.querySelector(".ml6 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
const ml6 = document.querySelectorAll(".ml6 .letter");

gsap.fromTo(
  ml6,
  0.5,
  {
    y: "1.5em",
  },
  {
    y: "0",
    stagger: 0.1,
    ease: "back.out(1.7)",
  }
);
// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });
const autofunctionA = (container) => {
  const about = document.querySelector(".about");
  about.classList.add("bigimage");
  const tl = gsap
    .timeline()
    .to(hometitle, 0.5, { opacity: 0 })
    .to(infos, 0.5, {
      opacity: 0,
      onComplete: () => {
        Flip.fit(about, ".fullscreen", {
          duration: 1,
          ease: Expo.easeInOut,
          absolute: true,
        });
      },
    });
  return tl;
};
const functionA = (container) => {
  const about = document.querySelector(".about");
  about.classList.add("bigimage");

  return Flip.fit(about, ".fullscreen", {
    duration: 5,
    ease: Expo.easeInOut,
    absolute: true,
    clearProps: "all",
  });
};
const functionC = (container) => {
  const contact = document.querySelector(".contact");
  contact.classList.add("bigimage");
  return Flip.fit(contact, ".fullscreen", {
    duration: 5,
    ease: Expo.easeInOut,
  });
};
const functionS = (container) => {
  const services = document.querySelector(".services");
  services.classList.add("bigimage");
  return Flip.fit(services, ".fullscreen", {
    duration: 5,
    ease: Expo.easeInOut,
  });
};
const enterAnimation = (container, time) => {
  const title = document.querySelector("#title");
  const tl = gsap.timeline();
  tl.from("#title", 0.7, { opacity: 0, y: 150, ease: Expo.easeInOut });
  return tl;
};
const enterAnimationH = (container, time) => {
  var textWrapper = document.querySelector(".ml6 .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
  const ml6 = document.querySelectorAll(".ml6 .letter");
  const tl = gsap.timeline();

  tl.from(container, 0.5, { opacity: 0 });
  tl.fromTo(
    ml6,
    0.5,
    {
      y: "1.5em",
    },
    {
      y: "0",
      stagger: 0.1,
      ease: "back.out(1.7)",
    },
    "-=0.3"
  );
  return tl;
};
const leaveAnimation = (container) => {
  return gsap.to(container, 0.3, {
    opacity: 0,
  });
};
const leaveAnimationAbout = (container) => {
  return gsap.to(".about", 0.3, {
    opacity: 0,
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

barba.hooks.after(() => {
  const ml6 = document.querySelectorAll(".ml6 .letter");
  bodyScrollBar.update();
  bodyScrollBar.scrollTo(0, 0);
  img.addEventListener("click", () => {
    gsap.to(hometitle, 0, { opacity: 0 });
    gsap.to(infos, 0, {
      opacity: 0,
    });
  });
});
// Smoooth Scrollbar

// const asscroll = new ASScroll({
//   disableRaf: true,
// });
// window.addEventListener("load", () => {});
// barba.hooks.after(() => {
//   asscroll.update();
//   asscroll.scrollTo(0, 0);
// });
barba.init({
  views: [
    {
      namespace: "about",
      beforeEnter(data) {
        window.scrollTo(0, 0);
        const title = document.querySelector(".imagecontainer .pagetitle");
        const hometitle = document.querySelector(".hometitle");
        const infos = document.querySelectorAll(".info");
        const img = document.querySelector(".item > img");
      },
    },
    {
      namespace: "contact",
      beforeEnter(data) {
        scrolltop();
        gsap.ticker.add(asscroll.update);
        window.onbeforeunload = function () {
          window.scrollTo(0, 0);
        };
      },
    },
    {
      namespace: "home",
      afterEnter(data) {
        fixed();
      },
    },
  ],
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
        await functionA(current.container);
      },

      enter({ next }) {
        enterAnimation(next.container, 0);
      },
      once({ next }) {
        initSmoothScrollbar();
      },
    },
    {
      name: "from-home-transition",
      to: {
        namespace: ["contact"],
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
        await functionC(current.container);
      },
      once: ({ next }) => {
        initSmoothScrollbar();
      },
      enter({ next }) {
        enterAnimation(next.container, 0);
      },
    },
    {
      name: "from-home-transition",
      to: {
        namespace: ["services"],
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
        await functionS(current.container);
      },
      once: ({ next }) => {
        initSmoothScrollbar();
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
      once: ({ next }) => {
        initSmoothScrollbar();
      },
      leave: ({ current }) => leaveAnimationAbout(current.container),

      enter({ next }) {
        enterAnimationH(next.container, 1);
      },
    },
  ],
});
