package DDG::Spice::Pubmed::Abstract;

use strict;
use DDG::Spice;

triggers startend => "///***never trigger***///";

spice to => 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=$1';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
