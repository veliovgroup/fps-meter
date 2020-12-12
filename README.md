[![support](https://img.shields.io/badge/support-GitHub-white)](https://github.com/sponsors/dr-dimitru)
[![support](https://img.shields.io/badge/support-PayPal-white)](https://paypal.me/veliovgroup)
<a href="https://ostr.io/info/built-by-developers-for-developers">
  <img src="https://ostr.io/apple-touch-icon-60x60.png" height="20">
</a>

# Measure FPS

While working with CSS, HTML, and JavaScript, it's always important to take care of browser rendering in browser DevTools. To find issues with rendering, we are using "Timeline" with "JS Profile" and "Memory" consumption tracking. Those tools are great when you know about the existing problem.

During our development process, we are using FPS-meter, which gives a signal when "Long" frames occur. To see meter action, visit [this link](https://cssbuilder.veliovgroup.com) (*in the left bottom corner*). Play with sliders to see how different CSS effects may slow down the rendering process, `blur` is the most "expensive" CSS3 filter.

This library works on mobile devices. It utilizes `performance.now` to measure time frame and `requestAnimationFrame` to measure rendered frames, both APIs are very efficient and have a minor impact (*for correct FPS measurement*).

## Demo:

- Demo can be found on [this website](https://cssbuilder.veliovgroup.com) (*in the left bottom corner*).

## Drop-in version

Installation is not required, copy-paste script into browser' console:

- Drop-in: [minified version](https://github.com/VeliovGroup/fps-meter/blob/master/fps-meter-drop-in.min.js);
- Drop-in: [developer version](https://github.com/VeliovGroup/fps-meter/blob/master/fps-meter-drop-in.js);
- Link [to minified file](https://raw.githubusercontent.com/VeliovGroup/fps-meter/master/fps-meter-drop-in.min.js);
- HTML Script: `<script type="text/javascript" src="https://raw.githubusercontent.com/VeliovGroup/fps-meter/master/fps-meter-drop-in.min.js"></script>`

## Installation

Installation is available via NPM for your favorite build tool and Atmosphere for Meteor.js

### NPM install

```shell
npm i --save fps-m
```

### Meteor add

```shell
meteor add ostrio:fps-meter
```

### NPM require

```js
// require
const FPSMeter = require('fps-m');

// ES6 import:
import FPSMeter from 'fps-m';
```

### Meteor: ES6 Import

```js
import { FPSMeter } from 'meteor/ostrio:fps-meter';
```

### Quick start

```js
(new FPSMeter({ui: true})).start();
```

## API

Render, start, pause, and resume FPS Meter

### `new FPSMeter([opts])`

- `opts` {*Object*}
- `opts.ui` {*Boolean*} - Render small box with current FPS into `body`, default: `false`
- `opts.reactive` {*Boolean*} - Store current FPS as reactive data source, default: `false`

```js
// Quick start:
const fps = new FPSMeter({ui: true, reactive: false});
// fps.start();
// fps.stop();
```

#### Methods

- `FPSMeter#start()` — Use to start measuring FPS. If `{ui: true}` small box with current FPS will be rendered into `body`
- `FPSMeter#stop()` — Use to stop measuring FPS. If `{ui: true}` box with current FPS will be removed from `body`
- `FPSMeter#pause()` — Use to pause measuring FPS. If `{ui: true}` box with current FPS will remain in `body`
- `FPSMeter#resume()` — Use to resume measuring FPS
- `FPSMeter#toggle()` — Use to toggle (pause/resume) measuring FPS

#### Properties

- `FPSMeter#isRunning` {*Boolean*} — `true` if meter is running and `false` when meter is on pause, stopped or has not started yet
- `FPSMeter#template` {*Blaze.View*|*undefined*} — When `{ui: true}` this property holds *Blaze.View* instance, otherwise its `undefined`
- `FPSMeter#element` {*DOMElement*|*undefined*} — When `{ui: true}` this property holds *DOMElement* of FPSMeter UI element `div`, otherwise its `undefined`
- `FPSMeter#fps` {*Number*|*ReactiveVar*} — When `{reactive: false}` it holds a {*Number*} with current FPS. When `{reactive: true}` it is an instance of `{*ReactiveVar*}`. Use `.get()` method to return current FPS. It's reactive data source, and can be used in template:

## Examples

### Pause/Resume by clicking on UI box

```js
const fps = new FPSMeter({ ui: true });
fps.start();
fps.element.addEventListener('click', fps.toggle.bind(fps), { passive: true, capture: false });
```

### Meteor.js usage

```js
const fps = new FPSMeter({ui: false, reactive: true});

Template.currentFPS.helpers({
  currentFPS() {
    return fps.fps.get();
  }
});

Template.currentFPS.events({
  'click [data-start-fps]'(e) {
    e.preventDefault();
    fps.start();
    return false;
  },
  'click [data-stop-fps]'(e) {
    e.preventDefault();
    fps.stop();
    return false;
  }
});
```

```html
<template name="currentFPS">
  <div>{{currentFPS}}</div>
  <button data-start-fps>Start</button>
  <button data-stop-fps>Stop</button>
</template>
```

## Support this project

- [Sponsor via GitHub](https://github.com/sponsors/dr-dimitru)
- [Support via PayPal](https://paypal.me/veliovgroup) — support my open source contributions once or on regular basis
- Use [ostr.io](https://ostr.io) — [Monitoring](https://snmp-monitoring.com), [Analytics](https://ostr.io/info/web-analytics), [WebSec](https://domain-protection.info), [Web-CRON](https://web-cron.info) and [Pre-rendering](https://prerendering.com) for a website
