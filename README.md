## Why?
Please see https://www.drupal.org/node/2497185

## Configuration

Place this in a php file somewhere and make sure apache/nginx/fpm (whatever you're using) has read access to it.

Then set the php.ini `auto_prepend_file` directive to point to this file.

```php
<?php

if (!empty($_GET['disable_opcache'])) {
  ini_set('opcache.enable', 0);
}
if (!empty($_GET['xhprof_on'])) {
  register_shutdown_function(function () {
    // Hack to make this run last yaaaarrrr
    register_shutdown_function(function () {
      $prof_results = xhprof_disable();
      $file_id = uniqid();
      $filename = $file_id . ".Drupal.xhprof";
      file_put_contents(ini_get('xhprof.output_dir') . "/" . $filename, serialize($prof_results));

      echo "<a id='xhprof-run-name' href='http://xhprof.drupalvm.dev?run={$file_id}&source=Drupal'>$filename</a>";
    });
  });

  xhprof_enable(XHPROF_FLAGS_MEMORY);
}
```

## Calling Stuff
Assuming you have a drush alias to whatever you're trying to run this against:

```bash
./run_scenario.sh A @alias.env
```
