package DDG::Spice::IPLookup;
# ABSTRACT: Returns information about an IP address

use strict;
use DDG::Spice;
use Regexp::IPv6 qw($IPv6_re);

my $trig = qr#(?:ip lookup)|(?:iplookup)|(?:reverse (?:dns|ip)(?: lookup)?)|(?:dns)|(?:whois)#i;
my $IPv4_re = qr/(?:[0-9]{1,3}\.){3}(?:[0-9]{1,3})/;
my $priv_guard = qr/(^127\.0\.0\.1)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)|(^::1$|^fc|^fd)/;

my $regex = qr/^(?:$trig (?:of|for|on)?[ ]?)?($IPv4_re|$IPv6_re)(?: $trig)?$/;
triggers query_raw => $regex;

spice to => 'https://www.robtex.com/ext/xapiq/?q=$1&filter=none&s=wip,asip,ddg&r=json';
spice wrap_jsonp_callback => 1;

sub is_ipv4($)
{
    my ($ip) = @_;
    return undef unless $ip =~ qr/^$IPv4_re$/;
    my @octlets = split /\./, $ip;
    for (@octlets) {
        return undef if int($_) > 255 || int($_) < 0;
    }
    return 1;
}

handle query_raw => sub {
    my $ip = $1;
    return if $ip =~ /$priv_guard/;
    return $ip if (is_ipv4($ip) || $ip =~ /^$IPv6_re$/);
    return;
};

1;
