var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

// TODO: Toss this in a node module
var url_base = casper.cli.has('uri') ? casper.cli.get('uri') : 'http://drupalvm.dev';

var login = function () {
  this.fill('form[id="user-login-form"]', {
    'name' : 'test',
    'pass' : 'test'
  }, true);
};

casper.start(url_base, login);

casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base + '/node/1', function () {});
casper.thenOpen(url_base, function () {});

casper.run();
