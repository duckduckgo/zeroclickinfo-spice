DuckDuckGo ZeroClickInfo Spice
=================================

About
-----

See https://github.com/duckduckgo/duckduckgo/wiki for a general overview on contributing to DuckDuckGo.

This repository is for contributing dynamic, external API based content to 0-click, e.g. getting the current bitcoin currency conversions. 


Contributing
------------

This repository is organized by type of content, each with its own directory. Some of those projects are in use on the live system, and some are still in development.

Inside each directory is files named

* project/spice.js

This file is what gets called by our systems at the appropriate time. To understand the flow, look at

* example/spice.js 

There are extensive workflow comments within it. This file is called by 

* example.html

which also has workflow comments within it. If you download the repository you should be able to run that example.html in your browser live, and it should work! You do not need a Web server to do this; just open it in your browser, i.e. drag it there. If it works, you should get a line about weather at the top.


