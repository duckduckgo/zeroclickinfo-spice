package DDG::Spice::Plos;
# ABSTRACT: Returns top 5 hits from PLOS database of research articles.

use DDG::Spice;

triggers startend => 'plos';

spice to => 'http://api.plos.org/search?q=$1&rows=5&wt=json'
            . '&fl=id,title_display,author_display,journal,volume,issue,publication_date'
            . '&api_key={{ENV{DDG_SPICE_PLOS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
