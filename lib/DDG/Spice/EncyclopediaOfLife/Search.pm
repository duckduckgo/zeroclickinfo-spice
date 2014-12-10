package DDG::Spice::EncyclopediaOfLife::Search;

use DDG::Spice;

name "Encyclopedia of Life";
description "Get information about plant and animal life";
source "Encyclopedia of Life";
primary_example_queries "animal robin";
secondary_example_queries "plant daisy";
icon_url "http://eol.org/assets/favicon-9de6ee8ce10b9ad7b2662236411f4539.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/EncyclopediaOfLife/Search.pm";
attribution web => ['http://www.steveglick.net', 'Steve Glick'],
            github => ['https://github.com/stevenmg', 'stevenmg'],
            twitter => ['https://twitter.com/stevenmglick', 'stevenmglick'];

spice to => 'http://eol.org/api/search/$1.json?callback={{callback}}';
triggers startend => 'animal', 'plant';

handle remainder_lc => sub {
    return $_ if $_;
    return;
};

1;