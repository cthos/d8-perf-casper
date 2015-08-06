## Why?
Please see https://www.drupal.org/node/2497185

## Requirements

* [CasperJS](http://casperjs.readthedocs.org/en/latest/installation.html)
* [xhprof-kit](https://github.com/LionsAd/xhprof-kit)
* Drupal 8 environment of your choosing.

## Configuration

Download and install [xhprof-kit](https://github.com/LionsAd/xhprof-kit). Follow the setup instructions to ensure the symlinks are in the proper places for your drupal installation. This will create an `index-perf.php` file which dohelpy.buildUrl is expecting to be there on requests it profiles.

## Calling Stuff
Assuming you have a drush alias to whatever you're trying to run this against:

```bash
./run_scenario.sh A @alias.env
```

## TODO

* Scenario A1 does not present you a link because it's not rendering a page to capture. It'll be the most recent run in `/xhprof-kit/xhprof/xhprof_html/index.php`
* Scenario A2 does not presently log immediately after module install, due to the form's redirection back to /admin/modules instead of passing through index-perf.php.
