var casper = require('casper').create();
var helpy = require('./dohelpy');
var url_base = helpy.getSiteUrl();

casper.start(url_base, function () {});
casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base, function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
