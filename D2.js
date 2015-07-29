var casper = require('casper').create();
var helpy = require('./dohelpy');

casper.start(helpy.buildUrl(''), helpy.login('test', 'test'));

casper.then(function () {
  // TODO: Is there a better way to do this?
  var childProcess = require("child_process");
  var casp = this;
  childProcess.execFile('drush', [casper.cli.get('alias'), 'cr'], null, function (err, stdout, stderr) {
    require('utils').dump(stdout);
    require('utils').dump(stderr);
  });
}).wait(10000); // Wait a bit for the drush command to complete.

casper.thenOpen(helpy.buildUrl('', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});
casper.thenOpen(helpy.buildUrl('', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});
casper.thenOpen(helpy.buildUrl('/node/1', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});
casper.thenOpen(helpy.buildUrl('/node/1', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});
casper.thenOpen(helpy.buildUrl('/node/2', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});
casper.thenOpen(helpy.buildUrl('/node/2', {
  "xhprof_on" : "1"
}), function (response) {
  helpy.findXHProfLink.call(this);
});

casper.run();
