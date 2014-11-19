package DDG::Spice::Coursera;
# Returns Infos about a given Coursera course

use DDG::Spice;

spice proxy_cache_valid => "200 1d";

name "Coursera";
description "Returns Infos about a given Coursera course";
primary_example_queries "coursera malware underground", "malware underground coursera";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Coursera.pm";
attribution github => ["https://github.com/puskin94", "puskin"];

triggers startend => "coursera";

spice to => 'https://api.coursera.org/api/catalog.v1/courses?q=search&query=$1&fields=shortDescription,smallIcon,instructor';
spice wrap_jsonp_callback => 1;

handle remainder => sub {

    return unless $_;
    return $_;
};

1;
