package DDG::Spice::Github;

use DDG::Spice;

triggers query_lc => qr#^github\s+(?!jobs?)(.+)$#i;
spice to => 'https://api.github.com/legacy/repos/search/$1';
spice wrap_jsonp_callback => 1;

handle matches => sub {
    return $_[0]
};

1;
