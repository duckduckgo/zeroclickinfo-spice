package DDG::Spice::WordMap;
# ABSTRACT: Twinword Word Map Instant Answer

use strict;
use DDG::Spice;

spice to => 'https://www.twinword.com/api/v2/context/user/duckduckgo/?entry=$1&api_key={{ENV{DDG_SPICE_WORDMAP_APIKEY}}}';
spice wrap_jsonp_callback => 1;

triggers startend => (
    "association:",
    "evocation",
    "evocation:",
    "related words",
    "related word",
    "word association",
    "expand:",
    "context:",
    "expand word",
    "extend word",
    "word cloud",
    "word map",
    "word cluster",
    "word graph",
    "twinword",
    "visual thesaurus"
);

triggers start => (
    "another words for",
    "another word for",
    "synonyms for",
    "synonym for",
    "similar to",
    "relate to",
    "related to",
    "words like",
    "word like",
    "words related to",
    "words similar to",
    "more words like"
);

handle remainder => sub {
    return unless /^(\w+)$/;
    return lc $_ if $_;
    return;
};

1;
