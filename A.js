var casper = require('casper').create();

var helpy = require('./dohelpy');
var url_base = helpy.getSiteUrl();

casper.start(url_base, helpy.login('admin', casper.cli.get(0)));

casper.thenOpen(url_base + '/admin/modules', function () {
  this.fill('form[id="system-modules"]', {
    'modules[Core][action][enable]' : '1'
  }, true);
});

casper.then(function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
