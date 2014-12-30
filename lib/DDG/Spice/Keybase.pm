package DDG::Spice::Keybase;
# ABSTRACT: Gets user public key from keybase.io

use DDG::Spice;

spice is_cached => 1;
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 1d';
spice to => 'https://keybase.io/_/api/1.0/user/lookup.json?usernames=$1';

name 'Keybase';
icon_url 'https://keybase.io/favicon.ico';
description 'Show PGP public key';
category 'computing_tools';
topics 'cryptography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Keybase.pm';

triggers startend => "keybase";

handle remainder => sub {
    return unless $_ =~ /^([^ ]+)$/;
    return $_;
};

1;
