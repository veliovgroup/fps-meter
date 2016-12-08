if (window.requestAnimationFrame == null) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}

var getTime = function() {
  return (performance && performance.now) ? performance.now() : +(new Date());
};

var element = null;
Template.FPSMeter.onRendered(function () {
  element = document.getElementById('__FPSMeter');
});

FPSMeter = (function() {
  function FPSMeter(opts) {
    var self = this;
    this.ui = opts.ui, this.reactive = opts.reactive;
    if (this.ui == null) {
      this.ui = false;
    }
    if (this.reactive == null) {
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

  FPSMeter.prototype.start = function() {
    var measure, self;
    self = this;
    this.fpss = 0;
    this.isRunning = true;
    if (this.ui === true && Blaze) {
      this.template = Blaze.render(Template.FPSMeter, document.getElementsByTagName('body')[0]);
    }
    measure = function() {
      var time = getTime();
      window.requestAnimationFrame(function getFPS() {
        self.fpss++;
        var period = getTime() - time;
        var _fps   = Math.round((1 / period) * 1000);
        if (self.reactive === true) {
          self.fps.set(_fps);
        } else {
          self.fps = _fps;
        }

        if (self.ui && element) {
          var i = 4 - ('' + _fps).length;
          var pad = '';
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
        if (self.isRunning) {
          measure();
        }
      });
    };
    measure();
  };

  FPSMeter.prototype.stop = function() {
    this.isRunning = false;
    if (this.ui === true && Blaze && this.template) {
      return Blaze.remove(this.template);
    }
  };

  return FPSMeter;
})();

export { FPSMeter };