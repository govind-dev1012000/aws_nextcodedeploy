#!/bin/bash
IS_ACTIVE=$(sudo systemctl is-active myApp)
if [ "$IS_ACTIVE" == "active" ]; then
    # restart the service
    echo "Service is running"
    echo "Restarting service"
    sudo systemctl stop myApp
    echo "Service restarted"

# pm2 stop nextapp