const comp = {
  sticky: {
    header: document.getElementById('myHeader'),
  },
  fs_banner: {},
  lightbox: {
      index: 1,
      open: () => {
        document.getElementById('myModal').style.display = 'block';
      },
      close: () => {
        document.getElementById('myModal').style.display = 'none';
      },
      show: (n) => {
           
      }
  },
};

// When the user scrolls the page, execute myFunction
window.onscroll = () => {
    const header = comp.sticky.header;
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function fwrd() {
  showSlides(slideIndex++);
}

// Next/previous controls
function back() {
  showSlides(slideIndex--);
}


// Thumbnail image controls
function slide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName('mySlides');
  var dots = document.getElementsByClassName('demo');
  var captionText = document.getElementById('caption');
  if (n >= slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  // dots[slideIndex - 1].className += " active";
  // captionText.innerHTML = dots[slideIndex - 1].alt;
}