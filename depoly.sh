#!/bin/bash

# cd /var/www/html/tcoa.org.nouveau0713.com
docker compose down
docker image rmi nuxt
docker compose up