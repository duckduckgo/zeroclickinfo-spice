package DDG::Spice::Maps::Chains;

use DDG::Spice;

spice to => 'https://duckduckgo.com/local.js?q=$1&cb={{callback}}';

# no caching.
spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

# Chains regular expression built from core DDG.
my $chains_re = share('chains_re')->slurp;

# consider query_clean and strip_grammar permutation on slurp
triggers query_lc => qr/^$chains_re$/s;

handle query_lc => sub {
    return $_;
};

1;

