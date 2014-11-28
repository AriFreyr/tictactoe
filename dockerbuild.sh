#!/bin/bash

export PATH=$PATH:/usr/local/bin

echo Cleaning...
rm -rf ./dist

echo Building app
rm -rf node_modules && npm cache clean && npm i
grunt

cp ./Dockerfile ./dist/

cd dist

echo Building docker image
docker build -t arifreyr/tictactoe .

echo "Done"
