#!/bin/bash

docker kill $(docker ps -a -q)
docker pull arifreyr/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=production" arifreyr/tictactoe
