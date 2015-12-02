package DDG::Spice::Pubmed::Ids;

use strict;
use DDG::Spice;

triggers startend => "///***never trigger***///";

spice to => 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&retmax=10&id=$1';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
