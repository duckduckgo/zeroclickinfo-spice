package DDG::Spice::Maps::Chains;

use DDG::Spice;
use DDG::Util::Regexp;
use DDG::Util::Constants qw( make_regex );
use DDG::Util::String qw( trim_ws );

spice to => 'https://127.0.0.1/local.js?q=$1&cb={{callback}}';

# no caching.
spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

my @chains = map { lc(trim_ws($_)) } share('chains.txt')->slurp;
my $chains_qr = make_regex(\@chains);

# consider query_clean and strip_grammar permutation on slurp
triggers query_lc => qr/^($chains_qr)$/;

handle query_lc => sub {
    return $_;
};

1;

