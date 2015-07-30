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

  adjustFormUrls : function () {
    this.evaluate(function () {
      var forms = document.querySelectorAll('form');
      for (var i = 0, len = forms.length; i < len; i++) {
        forms[i].action = '/index-perf.php?url=' + escape(forms[i].action);
      }
    });
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

    query.push('url=' + path);

    if (!options) {
      options = {};
    }

    if (options.disable_opcache) {
      query.push('disable_opcache=1');
    }
    if (!options.xhprof_on) {
      query.push('disable_xhprof=1');
    }

    return urlBase + '/index-perf.php' + "?" + query.join("&");
  }
};

module.exports = helpy;
