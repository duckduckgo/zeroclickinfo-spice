package DDG::Spice::NPM;
# ABSTRACT: Gets node package manager search results
use DDG::Spice;

triggers start => "npm";

spice to => 'http://search.npmjs.org/_list/search/search?startkey="$1"&limit=1';

handle remainder => sub {
    my $term = $_ || '';
    return $term if $term;
    return;
};

1;