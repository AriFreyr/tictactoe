#!/bin/bash

set -e
echo "Sending commands....."
ssh -o StrictHostKeyChecking=no root@178.62.218.30 "
docker kill tictactoe

docker rm tictactoe

docker pull arifreyr/tictactoe

docker run -p 80:8080 -d -e 'NODE_ENV=production' --name='tictactoe' arifreyr/tictactoe
"

echo "Done..."
