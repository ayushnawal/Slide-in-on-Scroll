function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(){
  sliderImages.forEach(sliderImage =>{
  const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height/2;
  const imageBottom  = sliderImage.offsetTop + sliderImage.height;
  const isHalfShown = slideInAt > sliderImage.offsetTop;
  const isNotScrolledPast = window.scrollY < imageBottom;
  if(isHalfShown && isNotScrolledPast){
    sliderImage.classList.add('active');
  }
  else{
    sliderImage.classList.remove('active');
  }
  });
}
window.addEventListener('scroll', debounce(checkSlide));
const triggers = document.querySelectorAll('p');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

function highlightLink(){
   const linkCoords = this.getBoundingClientRect();
   console.log(linkCoords);
   const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
   };

   highlight.style.width = `${coords.width}px`;
   highlight.style.height = `${coords.height}px`;
   highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
triggers.forEach(p => p.addEventListener('mouseenter',highlightLink));

const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;

function fixNav(){
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  }else{
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop=0;
  }
}

window.addEventListener('scroll', fixNav);