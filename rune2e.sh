#!/bin/bash

set -e
npm install protractor
webdriver-manager update
protractor protractor.conf.js

