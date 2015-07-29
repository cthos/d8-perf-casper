#! /bin/bash

profile="standard"
sitealias=$2

if [ -z "$sitealias" ];
then
  sitealias="@drupalvm.dev"
fi

siteuri=`drush $sitealias ev 'global $base_url; echo $base_url;'`

case $1 in
  A)
    echo "Running site-install on $sitealias"
    ## Maybe sed would be better here.
    pass=`drush $sitealias site-install $profile -y | grep password | cut -d ' ' -f 10`
    echo "The password for admin is $pass"
    casperjs A.js $pass --uri=$siteuri
    ;;
  B)
    drush @drupalvm.dev site-install $profile -y
    drush @drupalvm.dev pm-uninstall page_cache -y
    casperjs B.js --uri=$siteuri
    ;;
  C)
    drush @drupalvm.dev site-install $profile -y
    casperjs C.js --uri=$siteuri
    ;;
  D)
    echo "Running site-install on $sitealias"
    ## Maybe sed would be better here.
    pass=`drush $sitealias site-install $profile -y | grep password | cut -d ' ' -f 10`
    echo "The password for admin is $pass"
    casperjs D.js $pass
    casperjs D2.js --alias=@drupalvm.dev --uri=$siteuri
    ;;
esac
