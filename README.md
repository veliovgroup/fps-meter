Measure FPS
=====

While working with CSS, HTML, and JS it's always important to take care of browser rendering. To find issues with rendering we are using "Timeline" with "JS Profile" and "Memory" consumption tracking. Those tools is good when you're know about the existing problem.

During our development process we are using FPS-meter, which gives a signal when "Long" frames occurs. To see it action follow [this link](https://cssbuilder.veliovgroup.com) (*at left bottom corner*). Play with sliders to see how different CSS effects may slowdown rendering process.

This tool works on mobile devices. It uses `performance.now` to measure time period, and `requestAnimationFrame` to measure rendered frames, both APIs is very efficient and has minor impact (*which obviously helps to measure FPS more correctly*).

Installation
=====
```shell
meteor add ostrio:fps-meter
```

ES6 Import
=====
Although `FPSMeter` is exported to global scope, you may use `import`:
```jsx
import { FPSMeter } from 'meteor/ostrio:fps-meter';
```

Quick start
=====
```js
(new FPSMeter({ui: true, reactive: false})).start();
```

API
=====
#### `new FPSMeter([opts])`

 - `opts` {*Object*}
 - `opts.ui` {*Boolean*} - Render small box with current FPS into `body`
 - `opts.reactive` {*Boolean*} - Store current FPS as reactive data source

```js
// Quick start:
var FPS = new FPSMeter({ui: true, reactive: false});
// FPS.start();
// FPS.stop();
```

#### `FPS.start()`
Use to start measuring FPS. If `{ui: true}` small box with current FPS will be rendered into `body`

#### `FPS.stop()`
Use to stop measuring FPS. If `{ui: true}` box with current FPS will be removed from `body`

#### `FPS.fps`
If `{reactive: false}` it holds a {*Number*} with current FPS.

If `{reactive: true}` it is an instance of `ReactiveVar`. Use `.get()` method to return current FPS. It's reactive data source, and can be used in template:

```js
var FPS = new FPSMeter({ui: true, reactive: false});

Template.currentFPS.helpers({
  currentFPS: function () {
    return FPS.fps.get();
  }
});

Template.currentFPS.events({
  'click [data-start-fps]': function (e) {
    e.preventDefault();
    FPS.start();
    return false;
  },
  'click [data-stop-fps]': function (e) {
    e.preventDefault();
    FPS.stop();
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