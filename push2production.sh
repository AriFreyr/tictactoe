#!/bin/bash

set -e
echo "Sending commands....."
ssh -o StrictHostKeyChecking=no root@178.62.218.30 bash -c "'
docker stop arifreyr/tictactoe

docker pull arifreyr/tictactoe

docker start arifreyr/tictactoe
'"

echo "Done..."
