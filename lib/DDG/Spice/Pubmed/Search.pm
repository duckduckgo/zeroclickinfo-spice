package DDG::Spice::Pubmed::Search;

use strict;
use DDG::Spice;
use URI::Escape;

primary_example_queries 'pubmed crispr';
description 'Search for pubmed for abstracts';
name 'Pubmed';

triggers startend => ('pubmed');

spice to => 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=$1&retmode=json';

spice alt_to => {
    abstract => {
        # handle XML
        to => 'http://duckduckgo.com/x.js?u=' . uri_escape("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=") . '$1'
    },
    ids => {
        to => 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&retmax=10&id=$1'
    }
};

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return unless $_;
    return $_;
};

1;
