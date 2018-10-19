#!/bin/sh
#-###############################################-#
# C++ Cross-Compiler - The Luxcore Developer-2018 #
#-###############################################-#

#!/bin/bash
# Download latest node and install.

export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/lib"

export LUX_NAME="./lux-qt"
export LUX_ZIP="lux-qt-linux-16.zip"
export LUX_ZIP_PATH="https://github.com/LUX-Core/lux/releases/download/v5.2.2/lux-qt-linux-16.zip"

if [ ! -f "$LUX_NAME" ]; then
    if [ ! -f "$LUX_ZIP" ]; then
    	wget $LUX_ZIP_PATH
    fi
    unzip lux-qt-linux-16.zip
fi

# Setup configuration for node.
rpcuser=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')
rpcpassword=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo '')
cat >~/.lux/lux.conf <<EOL
rpcuser=$rpcuser
rpcpassword=$rpcpassword
daemon=1
txindex=1
EOL

# Start lux
./lux-qt

git clone https://github.com/lux-core/luxtre -b feature/luxgate-ui; cd luxtre/scripts/develop; bash install.sh

