const portfolioItem = document.getElementById('portfolio-item');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');

window.addEventListener('DOMContentLoaded', function () {
   portfolioItem.scrollLeft = 0;
});
window.addEventListener('pageshow', function () {
   portfolioItem.scrollLeft = 0;
});

function getScrollAmount() {
   const card = portfolioItem.querySelector('.portfolio-card');
   if (!card) return 250;
   const style = window.getComputedStyle(portfolioItem);
   let gap = 0;
   if (style.gap) {
      if (style.gap.endsWith('rem')) {
         gap = parseFloat(style.gap) * parseFloat(getComputedStyle(document.documentElement).fontSize);
      } else if (style.gap.endsWith('px')) {
         gap = parseFloat(style.gap);
      } else {
         gap = 16;
      }
   } else {
      gap = 16;
   }
   return card.offsetWidth + gap;
}

// Prevent fast clicking
let isScrolling = false;

function smoothScrollTo(element, target, duration = 100, callback) {
   if (isScrolling) return;
   isScrolling = true;
   const start = element.scrollLeft;
   const change = target - start;
   const startTime = performance.now();

   function easeInOutQuad(t) {
      return t < 0.5
         ? 2 * t * t
         : -1 + (4 - 2 * t) * t;
   }

   function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      element.scrollLeft = start + change * ease;
      if (progress < 1) {
         requestAnimationFrame(animateScroll);
      } else {
         isScrolling = false;
         if (callback) callback();
      }
   }
   requestAnimationFrame(animateScroll);
}

const NORMAL_SCROLL_DURATION = 100;
const WRAP_SCROLL_DURATION = 100;

arrowLeft.addEventListener('click', () => {
   if (isScrolling) return;
   if (portfolioItem.scrollLeft <= 0) {
      smoothScrollTo(portfolioItem, portfolioItem.scrollWidth, WRAP_SCROLL_DURATION);
   } else {
      smoothScrollTo(portfolioItem, portfolioItem.scrollLeft - getScrollAmount(), NORMAL_SCROLL_DURATION);
   }
});

arrowRight.addEventListener('click', () => {
   if (isScrolling) return;
   const maxScroll = portfolioItem.scrollWidth - portfolioItem.clientWidth;
   if (portfolioItem.scrollLeft >= maxScroll - 5) {
      smoothScrollTo(portfolioItem, 0, WRAP_SCROLL_DURATION);
   } else {
      smoothScrollTo(portfolioItem, portfolioItem.scrollLeft + getScrollAmount(), NORMAL_SCROLL_DURATION);
   }
});
