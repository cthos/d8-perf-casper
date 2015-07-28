var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var url_base = casper.cli.has('uri') ? casper.cli.get('uri') : 'http://drupalvm.dev';

casper.start(url_base, function () {});
casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base, function () {});

casper.run();
