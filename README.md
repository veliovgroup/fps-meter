# Measure FPS

<a href="https://www.patreon.com/bePatron?u=20396046">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="38">
</a>

<a href="https://ostr.io/info/built-by-developers-for-developers">
  <img src="https://ostr.io/apple-touch-icon-60x60.png" height="38">
</a>

While working with CSS, HTML, and JavaScript, it's always important to take care of browser rendering in browser DevTools. To find issues with rendering, we are using "Timeline" with "JS Profile" and "Memory" consumption tracking. Those tools are great when you know about the existing problem.

During our development process, we are using FPS-meter, which gives a signal when "Long" frames occur. To see meter action, visit [this link](https://cssbuilder.veliovgroup.com) (*in the left bottom corner*). Play with sliders to see how different CSS effects may slow down the rendering process, `blur` is the most "expensive" CSS3 filter.

This library works on mobile devices. It utilizes `performance.now` to measure time frame and `requestAnimationFrame` to measure rendered frames, both APIs are very efficient and have a minor impact (*for correct FPS measurement*).

## Drop-in version

Installation is not required, copy-paste script into browser' console, [see this Gist](https://gist.github.com/dr-dimitru/dcf0456c9c3d691e373a1adec8d60e16).

## Installation

```shell
meteor add ostrio:fps-meter
```

### ES6 Import

```js
import { FPSMeter } from 'meteor/ostrio:fps-meter';
```

### Quick start

```js
(new FPSMeter({ui: true})).start();
```

## API

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

### `FPSMeter#start()`

Use to start measuring FPS. If `{ui: true}` small box with current FPS will be rendered into `body`

### `FPSMeter#stop()`

Use to stop measuring FPS. If `{ui: true}` box with current FPS will be removed from `body`

### `FPSMeter#fps`

If `{reactive: false}` it holds a {*Number*} with current FPS.

If `{reactive: true}` it is an instance of `ReactiveVar`. Use `.get()` method to return current FPS. It's reactive data source, and can be used in template:

```js
const fps = new FPSMeter({ui: true, reactive: true});

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

## Support this project:

- [Become a patron](https://www.patreon.com/bePatron?u=20396046) — support my open source contributions with monthly donation
- Use [ostr.io](https://ostr.io) — [Monitoring](https://snmp-monitoring.com), [Analytics](https://ostr.io/info/web-analytics), [WebSec](https://domain-protection.info), [Web-CRON](https://web-cron.info) and [Pre-rendering](https://prerendering.com) for a website
