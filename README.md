## Why?
Please see https://www.drupal.org/node/2497185

## Requirements

* [CasperJS](http://casperjs.readthedocs.org/en/latest/installation.html) [On OSX, install from Git or NPM, not Homebrew](https://www.drupal.org/node/2497185#comment-10206465).
* [xhprof-kit](https://github.com/LionsAd/xhprof-kit)
* Drupal 8 environment of your choosing.

## Configuration

Download and install [xhprof-kit](https://github.com/LionsAd/xhprof-kit). Follow the setup instructions to ensure the symlinks are in the proper places for your drupal installation. This will create an `index-perf.php` file which dohelpy.buildUrl is expecting to be there on requests it profiles.

## Calling Stuff
Assuming you have a drush alias to whatever you're trying to run this against:

```bash
./run_scenario.sh A @alias
```

## TODO

* Scenario A1 does not present you a link because it's not rendering a page to capture. It'll be the most recent run in `/xhprof-kit/xhprof/xhprof_html/index.php`
