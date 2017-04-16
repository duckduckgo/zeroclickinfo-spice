package DDG::Spice::TorRelay;
# ABSTRACT: Returns relay information from onionoo tor status protocol

use DDG::Spice;

name 'Tor Relay';
description 'Tor relay status';
source 'Onionoo.torproject.org';
primary_example_queries 'onion relay torlan1';
secondary_example_queries 'tor relay torlan1';
category 'special';
topics 'special_interest', 'sysadmin', 'geek';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TorRelay.pm';
attribution github => [ 'https://github.com/edmlo', 'osu'],
            twitter => ['http://twitter.com/esodalomismo', 'osu'];

triggers startend => ("tor relay", "onion relay");

spice to => 'https://onionoo.torproject.org/details?fields=nickname,fingerprint,consensus_weight,or_addresses,last_seen,running,hibernating,flags,advertised_bandwidth,contact&limit=2&type=relay&search=$1';

spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    s/^tor relay\s*|\s*tor relay$//;
    s/^onion relay\s*|\s*onion relay$//;
    return $_ if $_;
};

1;
