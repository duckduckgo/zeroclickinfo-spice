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
    github => "konr",
    twitter => "konr",
    web => "http://konr.mobi";

## Source, set as valid for 1 hour
source "Wikinews";
spice is_cached => 1;
spice proxy_cache_valid => "any 1h";

## The 'latest news' are merely the 10 last members
## of the 'Published' category.
spice to => 'http://en.wikinews.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Published&format=json&cmsort=timestamp&cmdir=desc&cmprop=timestamp|ids|title&callback={{callback}}';


## Simply get the latest news published.
## To get the latest news ON SOMETHING, we could:
# (1) Guess its category and search for it using the same strategy.
#     The guess part is the hard one, however. If we take it to be
#     the input, it would work with 'sports', but not with 'sport'
#     'soccer juventus'
# (2) Use the 'search' suboperation instead of 'categorymembers',
#     but then the selected news wouldn't necessarily be new news,
#     but rather, high-ranked pages that could eclipse the real news
#     yielding a false positive result.
## ---------------------------------------------------------
# https://en.wikinews.org/w/api.php?action=help
handle remainder => sub {
    return '';
};



1;
