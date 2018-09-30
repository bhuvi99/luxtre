![LUX Logo](https://github.com/LUX-Core/lux/blob/master/src/qt/res/images/lux_logo_horizontal.png)

"FIRST OF ITS KIND"

Luxcore is GNU AGPLv3 licensed.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F216k155%2Flux.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2F216k155%2Flux?ref=badge_shield) [![Build Status](https://travis-ci.org/LUX-Core/lux.svg?branch=master)](https://travis-ci.org/LUX-Core/lux) [![GitHub version](https://badge.fury.io/gh/LUX-Core%2Flux.png)](https://badge.fury.io/gh/LUX-Core%2Flux.png) [![HitCount](http://hits.dwyl.io/216k155/lux.svg)](http://hits.dwyl.io/216k155/lux)
<a href="https://discord.gg/27xFP5Y"><img src="https://discordapp.com/api/guilds/364500397999652866/embed.png" alt="Discord server" /></a> <a href="https://twitter.com/intent/follow?screen_name=LUX_COIN"><img src="https://img.shields.io/twitter/follow/LUX_COIN.svg?style=social&logo=twitter" alt="follow on Twitter"></a>

[Website](https://luxcore.io) — [LUXtre + LUXGate](https://github.com/LUX-Core/luxtre) - [PoS Web Wallet](https://lux.poswallet.io) — [Block Explorer](https://explorer.luxcore.io/) — [Blog](https://reddit.com/r/LUXCoin) — [Forum](https://bitcointalk.org/index.php?topic=2254046.0) — [Telegram](https://t.me/LUXcoinOfficialChat) — [Twitter](https://twitter.com/LUX_Coin)

### LUXtre (Luxgate) Wallet
------------------

Luxcore aims to deploy Smart Contracts, LuxGate and Parallel Masternodes as part of its technical and business roadmap. A QT based wallet supporting these modules brings its own share of complexities in terms of scalability of the platform, ease of adding additional plug-ins, dApps and functionalities.
LUXtre (a take on the latin word, Lustre, meaning – to brighten) a hierarchical deterministic wallet client was born out of this desire to simplify both the end user experience and enhance the technical capabilities. Based on Daedalus, LUXtre goes one step ahead to enable Hybrid coin support and Masternode features.

It combines Javascript, HTML and CSS as it is built on the Electron platform (https://electronjs.org/). While it opens up the amazing capability of adding multiple home-grown and other plugins, it also ensures secure API connectivity.
LUXtre is platform agnostic and will form the base for our upcoming technical features like LuxGate and ParallelMasternodes, while actively supporting Smart Contract functionality.

### Install Node.js dependencies and clone LUXtre repo
-------------------------------------------------------
    sudo apt-get install build-essential libssl-dev npm nodejs nodejs-legacy
    sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | sh
    source ~/.profile
    nvm install v6.9.0
    nvm use v6.9.0
    git clone https://github.com/lux-core/luxtre
    cd luxtre
    npm update
    npm install
 
 ### Production
 --------------
 - BUild Linux:
    
        ./scripts/build-installer/linux.sh luxtre-version luxd-version
        
 - Build Wins x64:
 
        START > RUN c:\path_to_luxtre\scripts\build-installer\win64.bat luxtre-version luxd-version
        
 - Build Mac:
        
        ./scripts/build-installer/mac.sh luxtre-version luxd-version
-----------------------------------------------------------------------------
 ### Development
----------------

    npm run dev
    npm run hot-server
    npm run start-hot
    

### Testing
-----------

Testing and code review is the bottleneck for development; we get more pull
requests than we can review and test on short notice. Please be patient and help out by testing
other people's pull requests, and remember this is a security-critical project where any mistake might cost people
lots of money.

### Manual Quality Assurance (QA) Testing
-----------------------------------------
Changes should be tested by somebody other than the developer who wrote the
code. This is especially important for large or high-risk changes. It is useful
to add a test plan to the pull request description if testing the changes is
not straightforward.
    
### Issue
---------
We try to prompt our users for the basic information We always need for new issues.
Please fill out the issue template below and submit it to our discord channel
     
<a href="https://discord.gg/27xFP5Y"><img src="https://discordapp.com/api/guilds/364500397999652866/embed.png" alt="Discord server" /></a>
     
[ISSUE_TEMPLATE](https://github.com/LUX-Core/lux/blob/master/doc/template/ISSUE_TEMPLATE_example.md)

## License
-----------
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F216k155%2Flux.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F216k155%2Flux?ref=badge_large)
