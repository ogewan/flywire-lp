const comp = {
  sticky: {},
  fs_banner: {
    index: 1,
    auto: () => {
      if (!(comp.targets.modal.style.display == 'block' ||
            comp.targets.signup.style.display == 'block')) {
        comp.lightbox.next();
        return window.setTimeout(comp.fs_banner.auto, 7500);
      }
      return 0;
    }
  },
  lightbox: {
    index: 1,
    open: () => {
      comp.targets.modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    },
    close: () => {
      comp.targets.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      window.setTimeout(comp.fs_banner.auto, 2000);
    },
    next: () => comp.lightbox.show(++comp.lightbox.index),
    prev: () => comp.lightbox.show(--comp.lightbox.index),
    show: (n) => {
      const slides = comp.targets.slides, max = slides.length,
            bslide = comp.targets.bslide;

      if (!n) {
        n = max;
      } else {
        n = n % max || 1;
      }
      comp.lightbox.index = n;
      /*deactivate old slide, activate new slide */
      const active = comp.targets.active;
      active.classList.remove('active');
      comp.targets.active = slides[n - 1];
      comp.targets.active.classList.add('active');
      /*deactivate old banner, activate new banner, reset old banner sizing,
       * change new banner to reactive sizing*/
      const bactive = comp.targets.bactive;
      bactive.classList.remove('active');
      comp.targets.bactive = bslide[n - 1];
      comp.targets.bactive.classList.add('active');
      comp.targets.bactive.style.width = bactive.style.width;
      comp.targets.bactive.style.height = bactive.style.height;
      bactive.style.width = '';
      bactive.style.height = '';
    }
  },
  signup: {
    open: () => {
      comp.targets.signup.style.display = 'block';
      document.body.style.overflow = 'hidden';
    },
    close: () => {
      comp.targets.signup.style.display = 'none';
      document.body.style.overflow = 'auto';
      window.setTimeout(comp.fs_banner.auto, 2000);
    }
  },
  handlers: {
    scroll: () => {
      const header = comp.targets.header;
      const bannerPos = comp.targets.banner.getBoundingClientRect().bottom;
      if (bannerPos < 0) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    },
    resize: () => {
      const vw = window.innerWidth, vh = window.innerHeight,
            bactive = comp.targets.bactive;

      if (vw < vh) {
        bactive.style.width = '100%';
        bactive.style.height = 'auto';
      } else {
        bactive.style.width = 'auto';
        bactive.style.height = '100%';
      }
    },
    clicksign: () => {
      comp.signup.close();
    }
  },
  targets: {
    set: false,
    slides: Array.from(document.getElementsByClassName('mySlides')),
    header: document.getElementById('myHeader'),
    banner: document.getElementById('banner'),
    bslide: Array.from(document.getElementsByClassName('b-slide')),
    modal: document.getElementById('myModal'),
    signup: document.getElementById('signup'),
    signif: document.getElementById('signup_frame'),
    active: null,
    bactive: null,
  },
  set: () => {
    comp.targets.active =
        comp.targets.slides.find(e => e.classList.contains('active'));
    comp.targets.bactive =
        comp.targets.bslide.find(e => e.classList.contains('active'));
  }
};

window.onscroll = comp.handlers.scroll;
window.onresize = comp.handlers.resize;
comp.set();
comp.handlers.resize();
comp.targets.signup.addEventListener('click', comp.handlers.clicksign);
window.setTimeout(comp.fs_banner.auto, 7000);