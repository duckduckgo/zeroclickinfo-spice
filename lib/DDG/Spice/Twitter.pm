package DDG::Spice::Twitter;

use DDG::Spice;

spice to => 'https://jagtalon.duckduckgo.com/tw.js?user=$1&callback={{callback}}';
spice is_cached => 1;

triggers startend => "twitter";

handle remainder => sub { 
    return $_ if $_;
    return;
};

1;
