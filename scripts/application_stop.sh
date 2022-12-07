#!/bin/bash
IS_ACTIVE=$(sudo systemctl is-active myApp)
if [ "$IS_ACTIVE" == "active" ]; then
    # restart the service
    echo "Service is running"
    echo "Restarting service"
    sudo systemctl stop myApp
    echo "Service restarted"
else
    # create service file
    echo "Creating service file"
fi

# pm2 stop nextapp