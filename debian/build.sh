#!/bin/sh

# Check and install node if necessary
if ! [ -x "$(command -v node)" ]; then
  echo ">>> Install node"
  curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
  apt-get install -y nodejs
fi

echo ">>> Install dependencies"
cd ..
npm install
echo ">>> Build app"
npm run build
if [ $? -ne 0 ]; then
  exit 1
fi

echo ">>> Application is in parent dist folder"
