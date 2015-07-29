var helpy = {
  findXHProfLink : function () {
    var link = this.evaluate(function () {
      var xhprofLink = document.querySelector('a#xhprof-profiler-output');
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
  },

  buildUrl : function (path, options) {
    var urlBase = this.getSiteUrl();
    var query = [];

    if (!path) {
      path = '/';
    }

    if (!options) {
      options = {};
    }

    if (options.disable_opcache) {
      query.push('disable_opcache=1');
    }

    if (options.xhprof_on) {
      query.push('url=' + path);
      path = "/index-perf.php";
    }

    return urlBase + path + "?" + query.join("&");
  }
};

module.exports = helpy;
