package DDG::Spice::Wikinews;

use DDG::Spice;

## Basic info
triggers startend => "news", "wikinews";
description "Wikinews";
name "Wikinews";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Wikinews.pm";
topics "everyday", "social";
category "time_sensitive";

## Me!
attribution
    github => "konr",
    twitter => "konr",
    web => "http://konr.mobi";

## Source, set as valid for 1 hour
source "Wikinews";
spice is_cached => 1;
spice proxy_cache_valid => "any 1h";
spice to => 'http://en.wikinews.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Published&format=json&cmsort=timestamp&cmdir=desc&callback={{callback}}';


## No arguments, atm. I wish I could do `news barack obama` and get
## the latest news on barack obama.
## --------------------------------------------------------- 
## According to the guys at #mediawiki@freenode, it's currently
## impossible to implement this. The Search API can only use its ranking
## algorithm in a query like
## https://en.wikinews.org/w/api.php?action=query&list=search&srsearch=conservatives&srprop=snippet&srwhat=text
handle remainder => sub {
    return '' if $_ eq '';
    return;
};

1;
