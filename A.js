var casper = require('casper').create({verbose:true, logLevel:"debug"});

var stopIds = [];

var helpy = require('./dohelpy');

// Disable the redirect after /admin/modules
helpy.disableRedirectForUrl('/admin/modules', casper);

casper.start(helpy.buildUrl('', {
  "disable_opcache" : "1"
}), helpy.login('admin', casper.cli.get(0)));

casper.thenOpen(helpy.buildUrl('/admin/modules', {
  "disable_opcache" : "1"
}), function () {
  helpy.adjustFormUrls.call(this);

  this.fill('form[id="system-modules"]', {
    'modules[Core][action][enable]' : '1'
  }, true);
});

casper.then(function () {
  helpy.findXHProfLink.call(this);
});

casper.thenOpen(helpy.buildUrl('/admin/modules', {
  "disable_opcache" : "1",
  "xhprof_on" : true
}), function () {
  helpy.findXHProfLink.call(this);
});

casper.run();
