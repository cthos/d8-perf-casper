## Why?
Please see https://www.drupal.org/node/2497185

## Configuration

Currently you have to add the following to index.php in the Drupal install:

```php
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
if (!empty($_GET['disable_opcache'])) {
  ini_set('opcache.enable', 0);
}
xhprof_enable(XHPROF_FLAGS_MEMORY);
```

## Calling Stuff
Assuming you have a drush alias to whatever you're trying to run this against:

```bash
./run_scenario.sh A @alias.env
```
