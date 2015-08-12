var helpy = {
  disabledRedirects : [],
  stopIds : [],
  findXHProfLink : function () {
    var link = this.evaluate(function () {
      var xhprofLink = document.querySelector('a#xhprof-profiler-output');
      return xhprofLink.href;
    });

    if (link) {
      this.echo(link);
    }

    return link;
  },

  getFunctionsAndMemoryFromXHProf : function () {
    var functionCalls = this.evaluate(function () {
      var functionCalls = document.querySelectorAll('table td')[7];
      return functionCalls.innerHTML;
    });

    var memoryUsed = this.evaluate(function () {
      var memory = document.querySelectorAll('table td')[5];
      return memory.innerHTML;
    });

    this.echo("Function calls: " + functionCalls);
    this.echo("Memory Used: " + memoryUsed);

    var nextLink = this.getCurrentUrl();
    nextLink += "&symbol=PDOStatement::execute";
    this.thenOpen(nextLink, function () {
      // NESTING LEVEL IS GETTING OUT OF HAND.
      helpy.getPDOExecuteFromXHProf.call(this);
    });

    return {
      "memoryUsed" : memoryUsed,
      "functionCalls" : functionCalls
    }
  },

  getPDOExecuteFromXHProf : function () {
    var PDOCalls = this.evaluate(function () {
      var PDOCalls = document.querySelectorAll('table td')[2];
      return PDOCalls.innerHTML;
    });

    this.echo("PDO calls: " + PDOCalls);
  },

  adjustFormUrls : function () {
    this.evaluate(function () {
      var forms = document.querySelectorAll('form');
      for (var i = 0, len = forms.length; i < len; i++) {
        forms[i].action = '/index-perf.php?url=' + escape(forms[i].action);
      }
    });
  },

  disableRedirectForUrl: function (url, casper) {
    if (!this.disabledRedirects.length) {
      this.setupRedirectListeners(casper);
    }

    this.disabledRedirects.push(url);
  },

  setupRedirectListeners : function (casper) {
    var helpy = this;

    casper.on('resource.requested', function (data, net) {
      if (helpy.stopIds.indexOf(data.url) > -1) {
        console.log("Aborting " + data.url);
        net.abort();
      }
    });

    casper.on("resource.received", function(response) {
      if (response.redirectURL.indexOf('index-perf.php') > -1) {
        return;
      }
      // Only redirects?
      if (response.status !== 303 && response.status !== 302 && response.status !== 301) {
        return;
      }

      for (var x = 0, len = helpy.disabledRedirects.length; x < len; x++) {
        if (response.redirectURL.indexOf(helpy.disabledRedirects[x]) === -1) {
          continue;
        }

        console.log("adding id to stopIds: " + response.redirectURL);
        helpy.stopIds.push(response.redirectURL);
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
