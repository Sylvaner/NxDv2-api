#!/bin/sh

DEST_FOLDER=/usr/local/nextdom/api

if [ $(id -u) != 0 ]; then 
  echo "Error: This script must be executed with privilegied user"
  exit 1
fi

if ! [ -x "$(command -v node)" ]; then
  echo ">>> Install node"
  curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
  apt-get install -y nodejs
fi

if ! id -u "nextdom" > /dev/null 2>&1; then
  echo ">>> Création de l'utilisateur nextdom"
  adduser --system --shell /bin/sh --group nextdom
fi

if ! [ -f /etc/nextdom/nextdom.conf ]; then
  echo ">>> Copy configuration file"
  mkdir -p /etc/nextdom
  cp -fr nextdom.conf /etc/nextdom/nextdom.conf
  chown nextdom:nextdom -R /etc/nextdom
fi

echo ">>> Copy application files"
mkdir -p $DEST_FOLDER
cp -fr ../dist/* $DEST_FOLDER/
chown nextdom:nextdom -R $DEST_FOLDER

if [ -x "$(command -v systemctl)" ]; then
  echo ">>> Create service in SystemD"
  cp nextdom-api.service /etc/systemd/system/
  systemctl daemon-reload
  echo ">>> Enable and start service"
  systemctl enable nextdom-api
  systemctl start nextdom-api
else
  echo ">>> Create service in init.d"
  cp -fr nextdom-api /etc/init.d/
  update-rc.d nextdom-api defaults
  update-rc.d nextdom-api enable
  service nextdom-api start
fi
