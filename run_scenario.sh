#! /bin/bash

profile="standard"
sitealias=$2

if [ -z "$sitealias" ];
then
  sitealias="@drupalvm.dev"
fi

siteuri=`drush $sitealias ev 'global $base_url; echo $base_url;' | tr -d '[[:space:]]'`

case $1 in
  A)
    echo "Running site-install on $sitealias - $siteuri"
    ## Maybe sed would be better here.
    drush $sitealias site-install $profile -y --account-pass=admintest
    casperjs A.js "admintest" --uri=$siteuri
    ;;
  B)
    drush $sitealias site-install $profile -y --account-pass=admintest
    drush $sitealias pm-uninstall page_cache -y
    casperjs B.js --uri=$siteuri
    ;;
  C)
    drush $sitealias site-install $profile -y --account-pass=admintest
    casperjs C.js --uri=$siteuri
    ;;
  D)
    echo "Running site-install on $sitealias"
    drush $sitealias site-install $profile -y --account-pass=admintest
    casperjs D.js "admintest" --uri=$siteuri
    casperjs D2.js --alias=$sitealias --uri=$siteuri
    ;;
esac
