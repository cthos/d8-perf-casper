var helpy = {
  findXHProfLink : function () {
    var link = this.evaluate(function () {
      var xhprofLink = document.querySelector('a#xhprof-run-name');
      return xhprofLink.href;
    });

    if (link) {
      this.echo(link);
    }
  },

  login : function (name, pass) {
    return function () {
      this.fill('form[id="user-login-form"]', {
        'name' : name,
        'pass' : pass // TODO: Config and shit?
      }, true);
    }
  },

  getSiteUrl : function () {
    return casper.cli.has('uri') ? casper.cli.get('uri') : 'http://drupalvm.dev';
  }
};

module.exports = helpy;
