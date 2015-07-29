var casper = require('casper').create();
var helpy = require('./dohelpy')

casper.start(helpy.buildUrl(''), helpy.login('admin', casper.cli.get(0)));

casper.thenOpen(helpy.buildUrl('/node/add/page'), function () {
  this.fill('form[id="node-page-form"]', {
    'title[0][value]' : 'Test',
    'path[0][alias]' : 'test'
  }, true);
});

casper.then(function () {});

casper.thenOpen(helpy.buildUrl('/node/add/article'), function () {
  this.fill('form[id="node-article-form"]', {
    'title[0][value]' : 'Test 2',
    'path[0][alias]' : 'test2'
  });
  this.click('input[type="submit"][value="Save and publish"]');
});

casper.then(function () {});

casper.thenOpen(helpy.buildUrl('/admin/people/create'), function () {
  this.fill('form[id="user-register-form"]', {
    'name' : 'test',
    'pass[pass1]' : 'test',
    'pass[pass2]' : 'test'
  });
  this.click('input[type="submit"][value="Create new account"]');
});

casper.run();
