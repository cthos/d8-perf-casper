## Why?
Please see https://www.drupal.org/node/2497185

## Configuration

Download and install [xhprof-kit](https://github.com/LionsAd/xhprof-kit). Follow the setup instructions to ensure the symlinks are in the proper places for your drupal installation. This will create an `index-perf.php` file which dohelpy.buildUrl is expecting to be there on requests it profiles.

## Calling Stuff
Assuming you have a drush alias to whatever you're trying to run this against:

```bash
./run_scenario.sh A @alias.env
```
