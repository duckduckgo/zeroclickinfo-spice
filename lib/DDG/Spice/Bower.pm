package DDG::Spice::Bower;
# ABSTRACT: Returns a package list from Bower package registry.

use DDG::Spice;

triggers startend => 'bower';

spice to => 'http://bower.herokuapp.com/packages/search/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
