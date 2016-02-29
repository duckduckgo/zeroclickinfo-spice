package DDG::Spice::SimilarSites;
# ABSTRACT: Find sites that are similar to a given site

use DDG::Spice;
use Text::Trim;

triggers start => ["sites like", "similar sites to", "site like", "websites like", "website like", "webs like", "pages like"];

triggers any => ["similar sites", "similar web", "websites similar",
    "website similar", "similar websites", "similar website", "similar to"];

spice to => 'http://www.similarsitesearch.com/api/similar/$1';

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    $_ =~ s/(to|like|\s)*\s//g;
    $_ =~ s/^https?:\/\///;
    # remove whitespace
    trim($_);

    if (index($_, '.') == -1) {
        $_ .= '.com';
    }

    return $_ if $_;
    return;
};

1;
