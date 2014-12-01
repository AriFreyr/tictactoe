#!/bin/bash

ssh root@178.62.218.30

docker stop arifreyr/tictactoe
docker pull arifreyr/tictactoe
docker start arifreyr/tictactoe

exit
