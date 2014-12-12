#!/bin/bash

set -e
echo "Cleaning..."
rm -rf ./dist

echo "Building app"
rm -rf node_modules && npm i
#npm install
bower install

grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo "Building docker image"
docker build -t arifreyr/tictactoe:production .
docker build -t arifreyr/tictactoe:e2e .

echo "Done"
