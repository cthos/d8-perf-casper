var casper = require('casper').create();

var helpy = require('./dohelpy');
var url_base = helpy.getSiteUrl();

casper.start(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl('', {
  "xhprof_on" : "1"
}), function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
