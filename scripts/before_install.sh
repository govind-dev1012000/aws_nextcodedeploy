#!/bin/bash
sudo mkdir -p /home/ubuntu/app
sudo curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

IS_ACTIVE=$(sudo systemctl is-active MyApp)
if [ "$IS_ACTIVE" == "active" ]; then
    # restart the service
    echo "Service is running"
    echo "Restarting service"
    sudo systemctl restart MyApp
    echo "Service restarted"
else
    # create service file
    echo "Creating service file"
    sudo cat > /etc/systemd/system/MyApp.service << EOF
[Unit]
Description=This service will run npm start
After=network.target



[Service]
User=ubuntu
Group=www-data



WorkingDirectory=/home/ubuntu/app
ExecStart=npm start
[Install]
WantedBy=multi-user.target
EOF
    # restart daemon, enable and start service
    echo "Reloading daemon and enabling service"
    sudo systemctl daemon-reload 
    sudo systemctl enable MyApp # remove the extension
    sudo systemctl start MyApp
    echo "Service Started"
fi
