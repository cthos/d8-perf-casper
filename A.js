var casper = require('casper').create();

var helpy = require('./dohelpy');
var url_base = helpy.getSiteUrl();

casper.start(helpy.buildUrl('', {
  "disable_opcache" : "1"
}), helpy.login('admin', casper.cli.get(0)));

casper.thenOpen(helpy.buildUrl('/admin/modules', {
  "disable_opcache" : "1",
  "xhprof_on" : "1"
}), function () {
  this.fill('form[id="system-modules"]', {
    'modules[Core][action][enable]' : '1'
  }, true);
});

casper.then(function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
