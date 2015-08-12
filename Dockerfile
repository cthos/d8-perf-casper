FROM node:0.12.7

RUN apt-get update
RUN apt-get install -y php5

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
RUN composer global require drush/drush:dev-master
ENV PATH=$PATH:~/.composer/vendor/bin

RUN npm install -g casperjs
RUN npm install -g phantomjs

RUN mkdir /home/casper/
ADD . /home/casper/

RUN cp -rf /home/casper/drush ~/.drush

WORKDIR '/home/casper/'
ENTRYPOINT ["./run_scenario.sh"]
