import { Blaze }       from 'meteor/blaze';
import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (() => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}

const getTime = () => {
  return (performance && performance.now) ? performance.now() : +(new Date());
};

let element = null;
Template.FPSMeter.onRendered(() => {
  element = document.getElementById('__FPSMeter');
});

class FPSMeter {
  constructor(opts) {
    this.ui = opts.ui;
    this.reactive = opts.reactive;

    if (!this.ui) {
      this.ui = false;
    }

    if (!this.reactive) {
      this.reactive = false;
    }

    if (this.reactive === true) {
      this.fps = new ReactiveVar(0);
    } else {
      this.fps = 0;
    }

    this.isRunning = false;
    this.template = null;
  }

  start() {
    this.fpss = 0;
    this.isRunning = true;
    if (this.ui === true && Blaze) {
      this.template = Blaze.render(Template.FPSMeter, document.getElementsByTagName('body')[0]);
    }

    const measure = () => {
      const time = getTime();
      window.requestAnimationFrame(() => {
        this.fpss++;
        var period = getTime() - time;
        var _fps   = Math.round((1 / period) * 1000);
        if (this.reactive === true) {
          this.fps.set(_fps);
        } else {
          this.fps = _fps;
        }

        if (this.ui && element) {
          let i = 4 - ('' + _fps).length;
          let pad = '';
          while (i > 0) {
            pad += '&nbsp;';
            i--;
          }
          element.innerHTML = _fps + pad + 'fps';

          switch (false) {
          case !(_fps < 7):
            element.className = 'dead';
            break;
          case !(_fps < 25):
            element.className = 'danger';
            break;
          case !(_fps < 40):
            element.className = 'warn';
            break;
          default:
            element.className = '';
            break;
          }
        }

        if (this.isRunning) {
          measure();
        }
      });
    };
    measure();
  }

  stop() {
    this.isRunning = false;
    if (this.ui === true && Blaze && this.template) {
      Blaze.remove(this.template);
    }
  }
}

export { FPSMeter };
