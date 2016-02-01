package DDG::Spice::CodeSearch;
# ABSTRACT: Code search

use strict;
use DDG::Spice;

triggers startend => "code", "example";

spice to => 'https://searchcode.com/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

my $languages = join "|", share('languages.txt')->slurp;

handle remainder => sub {

    if ($_ =~ m/\b($languages)\b/x) {
        my $match = $1;

        $match =~ s/\+/\\+/g;

        s/\s*$match\s*//i;

        return "lang:".$match." ".$_;
    }
    return;
};

1;
