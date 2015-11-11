package DDG::Spice::Wikinews;

use DDG::Spice;

## Basic info
triggers startend => "wikinews";

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
