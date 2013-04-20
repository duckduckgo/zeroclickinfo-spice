package DDG::Spice::Plos;
# ABSTRACT: Returns 5 best research articles from PLOS database.

use DDG::Spice;

triggers startend => 'plos';

spice to => 'http://api.plos.org/search?q=$1&rows=5&wt=json&api_key={{ENV{DDG_SPICE_PLOS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
    return $_;
    return '' if $_ eq '';
    return;
};

1;
