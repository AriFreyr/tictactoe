#!/bin/bash

set -e
echo "Sending commands....."
ssh root@178.62.218.30 'bash -s' < getdockerimage.sh
echo "Done..."
