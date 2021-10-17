#!/usr/bin/env bash

# PROJECT_NAME="Name or your frontend project, for example movie --> folder you created under /var/www"
# DROPLET_URL="URL for your droplet"
# echo -n "CA1-Front"
# read -r 
# PROJECT_NAME=$REPLY
# echo -n "138.68.81.94"
# read -r
# DROPLET_URL=$REPLY

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@138.68.81.94:/var/www/CA1-Front

