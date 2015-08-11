Place Drush Aliases in this folder and they'll be moved to ~/.drush/ when the container is built.

### Special changes for the drush aliases

In order for the container to not continually warn you about adding hosts to known hosts or ask you to confirm the ssh connection, Add the following to the drush alias:

```php
'ssh-options' => '-o StrictHostKeyChecking=no -o LogLevel=quiet',
```
