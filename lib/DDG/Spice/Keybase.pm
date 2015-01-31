package DDG::Spice::Keybase;
# ABSTRACT: Gets user public key from keybase.io

use DDG::Spice;

spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 1d';
spice from => '(\w+)/(\w+)';
spice to => 'https://keybase.io/_/api/1.0/user/lookup.json?fields=basics,public_keys,profile,pictures&$1=$2';

name 'Keybase';
icon_url 'https://keybase.io/favicon.ico';
description 'Shows user information from keybase.io.';
category 'computing_tools';
topics 'cryptography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Keybase.pm';
primary_example_queries 'keybase mwolny', 'keybase jeresig';
secondary_example_queries 'keybase github:mwolny', 'keybase twitter:jeresig';

triggers startend => 'keybase';

handle remainder => sub {
    /^(\w+):(\w+)$/ || /^(\w+)$/ || return;
    my ($service, $user) = $#+ > 1 ? ($1, $2) : ('username', $1);
    return $service, $user
        if grep $service, qw/username domain twitter github reddit hackernews coinbase key_fingerprint/;
    return;
};

1;
