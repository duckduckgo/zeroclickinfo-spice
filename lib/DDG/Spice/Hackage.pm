package DDG::Spice::Hackage;
# ABSTRACT: Search for information about Hackage packages

use DDG::Spice;

triggers startend => 'haskell', 'hoogle', 'hackage';

spice to => 'https://www.haskell.org/hoogle/?mode=json&hoogle=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
