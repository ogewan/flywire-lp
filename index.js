const comp = {
  fs_banner: {
    index: 0,
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
    index: 0,
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
      const slides = comp.targets.slides, max = slides.length - 1,
            bslide = comp.targets.bslide;

      if (n < 0) {
        n = max;
      } else if (n > max) {
        n = 0;
      }
      comp.lightbox.index = n;
      comp.targets.slidenum.innerText = `${n + 1} / 8`;
      /*deactivate old slide, activate new slide */
      const active = comp.targets.active;
      active.classList.remove('active');
      comp.targets.active = slides[n];
      comp.targets.active.classList.add('active');
      /*deactivate old banner, activate new banner, reset old banner sizing,
       * change new banner to reactive sizing*/
      const bactive = comp.targets.bactive;
      bactive.classList.remove('active');
      comp.targets.bactive = bslide[n];
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
    clicksign: () => {
      comp.signup.close();
    }
  },
  targets: {
    set: false,
    slides: Array.from(document.getElementsByClassName('slide')),
    banner: document.getElementById('banner'),
    bslide: Array.from(document.getElementsByClassName('b-slide')),
    modal: document.getElementById('myModal'),
    signup: document.getElementById('signup'),
    signif: document.getElementById('signup_frame'),
    slidenum: document.getElementById('slidenum'),
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

comp.set();
comp.targets.signup.addEventListener('click', comp.handlers.clicksign);
document.querySelector('dialog').addEventListener('click', e => {
  e.stopPropagation();
});
window.setTimeout(comp.fs_banner.auto, 7000);