var casper = require('casper').create();

var helpy = require('./dohelpy');

casper.start(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl(''), function () {});
casper.thenOpen(helpy.buildUrl('', {
  "xhprof_on" : "1"
}), function () {
  nextLink = helpy.findXHProfLink.call(this);
  this.thenOpen(nextLink, function () {
    helpy.getFunctionsAndMemoryFromXHProf.call(this);
  });
});

casper.run();
