package DDG::Spice::TorNode;
# ABSTRACT: Returns information about a Tor node

use DDG::Spice;
use Regexp::IPv6 qw($IPv6_re);

my $node_ip  = "198.96.155.3";
my $node_fp1 = "BCEDF6C193AA687AE471B8A22EBF6BC57C2D285E";
my $node_fp2 = "3E0908F131AC417C48DDD835D78FB6887F4CD126";

name "Tor Node";
description "Shows information about a Tor node";
primary_example_queries "tor node 198.96.155.3",
                        "tor bridge BCEDF6C193AA687AE471B8A22EBF6BC57C2D285E",
                        "tor bridge node 3E0908F131AC417C48DDD835D78FB6887F4CD126",
                        "tor exit 198.96.155.3",
                        "tor exit node BCEDF6C193AA687AE471B8A22EBF6BC57C2D285E",
                        "tor relay 3E0908F131AC417C48DDD835D78FB6887F4CD126",
                        "tor relay node 198.96.155.3";
category "computing_tools";
topics "sysadmin";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TorNode.pm";
attribution web => ["http://mogigoma.com/", "Mak Kolybabi"],
            github => ["https://github.com/mogigoma", "Mogigoma"],
            twitter => ["https://twitter.com/mogigoma", "Mogigoma"];

triggers startend => "tor node",
                     "tor exit", "tor exit node",
                     "tor relay", "tor relay node",
                     "tor bridge", "tor bridge node";

spice is_cached           => 0;
spice from                => '^([^/]+)/([0-9]+)$';
spice to                  => 'https://onionoo.torproject.org/details?search=$1&limit=$2&order=-consensus_weight';
spice wrap_jsonp_callback => 1;

my $IPv4_1_re = qr/(?:[0-9]{1,3}\.){3}(?:[0-9]{1,3})/;    # Matches full IPv4 addresses.
my $IPv4_X_re = qr/(?:[0-9]{1,3}\.){1,2}(?:[0-9]{1,3})?/; # Matches partial IPv4 addresses.
my $SHA1_re   = qr/[0-9a-f]{40}/i;                        # Matches bare and hased fingerprints.
my $Nick_re   = qr/[0-9a-z]{1,19}/i;                      # Matches node nicknames.

sub is_ipv4 {
    my ($ip, $re) = @_;
    return undef unless $ip =~ qr/^$re$/;

    my @octlets = split(/\./, $ip);
    for (@octlets) {
        return undef if int($_) < 0 || int($_) > 255;
    }

    return 1;
}

handle remainder => sub {
    # We require some kind of identifier to search for.
    return unless $_;

    # Ensure that only valid characters are in the identifier.
    return unless $_ =~ m/[.:0-9a-z]+/i;

    # If it matches a full, unique identifier...
    if (is_ipv4($_, $IPv4_1_re) || $_ =~ /^$SHA1_re$/ || $_ =~ /^$IPv6_re$/) {
        return $_, 1;
    }

    # Otherwise we're doing a full-text or IP prefix search with an arbitrary limit.
    if (is_ipv4($_, $IPv4_X_re) || $_ =~ /^$Nick_re$/) {
        return $_, 25;
    }

    # The remainder was not recognized as an identifier.
    return;
};

1;
