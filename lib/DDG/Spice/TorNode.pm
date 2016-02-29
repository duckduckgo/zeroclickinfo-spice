package DDG::Spice::TorNode;
# ABSTRACT: Returns information about a Tor node

use DDG::Spice;
use Regexp::IPv6 qw($IPv6_re);

my $node_ip  = "198.96.155.3";
my $node_fp1 = "BCEDF6C193AA687AE471B8A22EBF6BC57C2D285E";
my $node_fp2 = "3E0908F131AC417C48DDD835D78FB6887F4CD126";

triggers startend => "tor node",
                     "tor exit", "tor exit status", "tor exit node", "tor exit node status",
                     "tor relay", "tor relay status", "tor relay node", "tor relay node status",
                     "tor bridge", "tor bridge status", "tor bridge node", "tor bridge node status",
                     "onion node",
                     "onion exit", "onion exit status", "onion exit node", "onion exit node status",
                     "onion relay", "onion relay status", "onion relay node", "onion relay node status",
                     "onion bridge", "onion bridge status", "onion bridge node", "onion bridge node status";

spice is_cached           => 0;
spice from                => '([^/]+)/([0-9]+)';
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
