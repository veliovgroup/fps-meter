import { Blaze }       from 'meteor/blaze';
import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (() => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}

const getTime = () => {
  return (window.performance && window.performance.now) ? window.performance.now() : +new Date();
};

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

  measure() {
    const time = getTime();
    window.requestAnimationFrame(() => {
      const _fps = Math.round((1 / (getTime() - time)) * 1000);

      if (this.reactive === true) {
        this.fps.set(_fps);
      } else {
        this.fps = _fps;
      }

      if (this.ui && this.element) {
        let i = 4 - `${_fps}`.length;
        let pad = '';

        while (i > 0) {
          pad += '&nbsp;';
          i--;
        }

        this.element.innerHTML = `${_fps}${pad}fps`;

        switch (false) {
        case !(_fps < 7):
          this.element.className = 'dead';
          break;
        case !(_fps < 25):
          this.element.className = 'danger';
          break;
        case !(_fps < 40):
          this.element.className = 'warn';
          break;
        case !(_fps > 70):
          this.element.className = 'high';
          break;
        default:
          this.element.className = '';
          break;
        }
      }

      if (this.isRunning) {
        this.measure();
      }
    });
  }

  start() {
    this.isRunning = true;

    if (this.ui === true && Blaze) {
      this.template = Blaze.render(Template.FPSMeter, document.body);
      this.element = this.template.templateInstance().find('#__FPSMeter');
    }

    this.measure();
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    this.isRunning = true;
    this.measure();
  }

  toggle() {
    this.isRunning ? this.pause() : this.resume();
  }

  stop() {
    this.isRunning = false;
    if (this.ui === true && Blaze && this.template) {
      Blaze.remove(this.template);
    }
  }
}

export { FPSMeter };
