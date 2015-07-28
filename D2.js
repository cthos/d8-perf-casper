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

casper.then(function () {
  // TODO: Is there a better way to do this?
  var childProcess = require("child_process");
  var casp = this;
  childProcess.execFile('drush', [casper.cli.get('alias'), 'cr'], null, function (err, stdout, stderr) {
    require('utils').dump(stdout);
    require('utils').dump(stderr);
  });
}).wait(10000); // Wait a bit for the drush command to complete.

casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base, function () {});
casper.thenOpen(url_base + '/node/1', function () {});
casper.thenOpen(url_base + '/node/1', function () {});
casper.thenOpen(url_base + '/node/2', function () {});
casper.thenOpen(url_base + '/node/2', function () {});

casper.run();
