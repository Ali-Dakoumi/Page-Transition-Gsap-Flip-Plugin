# Page-transition-barbaJS-gsap-flip-plugin-

This is a simple project using barba JS to make creative page transitions.

Check it out here : https://ali-dakoumi.github.io/Page-Transition-Gsap-Flip-Plugin/

I used some other libraries for animations and smooth scroll:

- Greensock
- Anime JS
- smooth-scrolbar

## Problem faced:

when the page transition starts, barba add the next container to the DOM while the current container still there too, so when when using gsap FLIP, the cordinates of the children of the next container will be different, so you need to fix the next container position before FLIP animation starts.
you can read more about that issue here: https://greensock.com/forums/topic/31644-flip-plugin-doesnt-work-properly-after-page-transition-with-barba-js/#comment-158135
