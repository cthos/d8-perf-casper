var casper = require('casper').create();
var helpy = require('./dohelpy');

casper.start(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl('', {
  "xhprof_on" : "1"
}), function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
