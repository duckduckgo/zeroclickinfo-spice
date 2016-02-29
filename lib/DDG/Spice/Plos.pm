package DDG::Spice::Plos;
# ABSTRACT: Search for scientific articles on PLOS ONE

use strict;
use DDG::Spice;

triggers startend => 'plos', 'plos one', 'plosone', 'public library of science', 'plos journal', 'plos publications';

spice to => 'http://api.plos.org/search?q=$1&rows=10&wt=json'
            . '&fl=id,title_display,author_display,journal,volume,issue,publication_date'
            . '&api_key={{ENV{DDG_SPICE_PLOS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

# Skip these queries.
# We don't want this instant answer to trigger with "plos one api" and the like.
my %skip = map {$_ => 1} ('blog', 'blogs', 'website', 'api');

handle remainder => sub {
    # Only trigger if the remainder does not exist in the skip hash.
    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;
