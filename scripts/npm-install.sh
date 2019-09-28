#!/bin/bash
cd /home/ubuntu
mkdir raw
cd /home/ubuntu/raw
git pull origin master
npm install
npm audit fix --force