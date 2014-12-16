#!/bin/bash

set -e
echo "Sending commands....."
ssh -o StrictHostKeyChecking=no root@178.62.205.225 "
docker kill tictactoe

docker rm tictactoe

docker pull arifreyr/tictactoe:e2e

docker run -p 80:8080 -d -e 'NODE_ENV=production' --name='tictactoe' arifreyr/tictactoe:e2e
"

echo "Done..."
sleep 10
