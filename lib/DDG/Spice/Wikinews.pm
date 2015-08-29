package DDG::Spice::Wikinews;

use DDG::Spice;

## Basic info
triggers startend => "wikinews";
description "Wikinews";
name "Wikinews";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Wikinews.pm";
topics "everyday", "social";
category "time_sensitive";

## Me!
attribution
    github => "iambibhas",
    twitter => "bibhasdn",
    web => "https://bibhas.in";

## Source, set as valid for 1 hour
source "Wikinews";
spice is_cached => 1;
spice proxy_cache_valid => "5m";

## The 'latest news' are merely the 10 last members
## of the 'Published' category.
spice to => 'https://en.wikinews.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Published&format=json&cmsort=timestamp&cmdir=desc&cmprop=ids|title|timestamp&callback={{callback}}';

## Simply get the latest news published.
handle remainder => sub {
    return $_ if $_;
};

1;
