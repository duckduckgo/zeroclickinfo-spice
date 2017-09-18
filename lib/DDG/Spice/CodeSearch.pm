package DDG::Spice::CodeSearch;
# ABSTRACT: Code search

use strict;
use DDG::Spice;

triggers startend => "code", "example";

spice to => 'https://sourcegraph.com/.api/global-search?Query=$1&Limit=1&Fast=0';
spice wrap_jsonp_callback => 1;

my $languages = join "|", share('languages.txt')->slurp;

handle remainder => sub {

    if ($_ =~ m/\b($languages)\b/x) {
        my $match = $1;

        $match =~ s/\+/\\+/g;

        s/\s*$match\s*//i;

        return $match." ".$_;
    }
    return;
};

1;
