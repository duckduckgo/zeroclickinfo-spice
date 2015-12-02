package DDG::Spice::Pubmed::Search;

use strict;
use DDG::Spice;

primary_example_queries 'pubmed crispr';
description 'Search for pubmed for abstracts';
name 'Pubmed';

triggers startend => ('pubmed');

spice to => 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=$1&retmode=json';

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return unless $_;
    return $_;
};

1;
