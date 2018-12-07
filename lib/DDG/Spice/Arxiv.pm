package DDG::Spice::Arxiv;

# ABSTRACT: Retrieve articles from arxiv.org by identifier

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 7d";

spice wrap_jsonp_callback => 1;

spice to => 'https://duckduckgo.com/x.js?u=http://export.arxiv.org/api/query?id_list=$1';

triggers start => 'arxiv';

handle query_lc => sub {
    return unless m/^arxiv[:\s]+?([^\s]+)/;
    return $1;
};

1;
