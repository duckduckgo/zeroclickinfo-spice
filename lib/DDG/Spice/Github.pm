package DDG::Spice::Github;

use DDG::Spice;

triggers query_lc => qr#^github\s+(.+)$#i;
spice to => 'http://github.com/api/v2/json/repos/search/$1';
spice wrap_jsonp_callback => 1;

handle matches => sub {
    return $_[0]
};

1;
