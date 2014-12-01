#!/bin/bash

###export PATH=$PATH:/usr/local/bin
###export DOCKER_TLS_VERIFY=1
###export DOCKER_HOST=tcp://192.168.59.103:2376
###export DOCKER_CERT_PATH=/Users/DrepAri/.boot2docker/certs/boot2docker-vm

set -e
echo "Cleaning..."
rm -rf ./dist

echo "Building app"
rm -rf node_modules && npm cache clean && npm i
#npm install
bower install

grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo "Building docker image"
docker build -t arifreyr/tictactoe .

echo "Done"
