package DDG::Spice::Keybase;
# ABSTRACT: Gets user public key from keybase.io

use strict;
use DDG::Spice;

spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 1d';
spice from => '(\w+)/(\w+)';
spice to => 'https://keybase.io/_/api/1.0/user/lookup.json?fields=basics,proofs_summary,public_keys,profile,pictures&$1=$2';

triggers startend => 'keybase';

handle remainder => sub {
    /^(\w+):(\w+)$/ || /^(\w+)$/ || return;
    my ($service, $user) = $#+ > 1 ? ($1, $2) : ('username', $1);
    return $service, $user
        if grep $service, qw/username domain twitter github reddit hackernews coinbase key_fingerprint/;
    return;
};

1;
