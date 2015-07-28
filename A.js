var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

// TODO: Toss this in a node module
var url_base = casper.cli.has('uri') ? casper.cli.get('uri') : 'http://drupalvm.dev';

function findXHProfLink() {
  var link = this.evaluate(function () {
    var xhprofLink = document.querySelector('a#xhprof-run-name');
    return xhprofLink.href;
  });

  if (link) {
    this.echo(link);
  }
}

var login = function () {
  this.fill('form[id="user-login-form"]', {
    'name' : 'admin',
    'pass' : casper.cli.get(0) // TODO: Config and shit?
  }, true);
};

casper.start(url_base, login);

casper.thenOpen(url_base + '/admin/modules', function () {
  this.fill('form[id="system-modules"]', {
    'modules[Core][action][enable]' : '1'
  }, true);
});

casper.then(function () {
  findXHProfLink.call(this);
});

casper.run();
