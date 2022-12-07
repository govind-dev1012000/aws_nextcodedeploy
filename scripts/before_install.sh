#!/bin/bash
sudo mkdir -p /home/ubuntu/app
sudo curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v
npm install pm2@latest -g

IS_ACTIVE=$(sudo systemctl is-active pm2-ubuntu)
if [ "$IS_ACTIVE" == "active" ]; then
    # restart the service
    echo "Service is running"
    echo "Restarting service"
    sudo systemctl restart pm2-ubuntu
    echo "Service restarted"
else
    # create service file
    echo "Creating pm2 file"
    sudo cat > /home/ubuntu/app/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'nextapp', // Your project name
      cwd: '/home/ubuntu/app', // Path to your project
      script: 'npm',
      args: 'start', 
    }
  ],
};
EOF
    # restart daemon, enable and start service
    echo "Pm2 Service"
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
    pm2 save
fi


# IS_ACTIVE=$(sudo systemctl is-active myApp)
# if [ "$IS_ACTIVE" == "active" ]; then
#     # restart the service
#     echo "Service is running"
#     echo "Restarting service"
#     sudo systemctl restart myApp
#     echo "Service restarted"
# else
#     # create service file
#     echo "Creating service file"
#     sudo cat > /etc/systemd/system/myApp.service << EOF
# [Unit]
# Description=This service will run npm start
# After=network.target



# [Service]
# User=ubuntu
# Group=www-data



# WorkingDirectory=/home/ubuntu/app
# ExecStart=npm start
# [Install]
# WantedBy=multi-user.target
# EOF
#     # restart daemon, enable and start service
#     echo "Reloading daemon and enabling service"
#     sudo systemctl daemon-reload 
#     sudo systemctl enable myApp # remove the extension
#     sudo systemctl start myApp
#     echo "Service Started"
# fi
