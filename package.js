Package.describe({
  name: 'ostrio:fps-meter',
  version: '0.0.1',
  summary: 'Efficient and accurate FPS meter, with minimalistic UI',
  git: 'https://github.com/VeliovGroup/fps-meter',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.use(['templating', 'ecmascript'], 'client');
  api.addFiles('fps-meter.html', 'client');
  api.mainModule('fps-meter.js', 'client');
  api.export('FPSMeter', 'client');
});