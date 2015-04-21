package DDG::Spice::SimilarSites;
# ABSTRACT: Find sites that are similar to a given site

use DDG::Spice;
use Text::Trim;

primary_example_queries "similar sites to facebook.com", "similar to youtube.com";
secondary_example_queries "sites like twitter.com", "pages like github.com";
description "Search for similar websites";
name "SimilarSites search";
source "SimilarSites";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SimilarWeb.pm";
icon_url "/i/www.similarsitesearch.com.ico";
category "entertainment";
topics "everyday", "special_interest";
attribution github => ['https://github.com/Adman', 'Adman'],
            twitter => ['http://twitter.com/adman_X', 'adman_X'];

triggers start => ["sites like", "site like", "websites like", "website like", "webs like", "pages like"];

triggers any => ["similar sites", "similar web", "websites similar", "website similar", "similar websites", "similar website"];

spice to => 'http://www.similarsitesearch.com/api/similar/$1';

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    $_ =~ s/(to|like|\s)*//g;
    $_ =~ s/^https?:\/\///;
    # remove whitespace
    trim($_);

    return $_ if $_;
};

1;
