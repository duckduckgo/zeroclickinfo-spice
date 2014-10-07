package DDG::Spice::IPLookup;
# ABSTRACT: Returns information about an IP address

use DDG::Spice;
use Regexp::IPv6 qw($IPv6_re);

primary_example_queries "reverse dns 8.8.8.8";
description "Shows reverse DNS information about an IP";
name "IPLookup";
category 'computing_tools';
topics "sysadmin";

attribution github => ['https://github.com/mintsoft', 'mintsoft'],
               web => 'http://www.robtex.com/';

my $trig = qr#(?:ip lookup)|(?:iplookup)|(?:reverse (?:dns|ip)(?: lookup)?)|(?:dns)|(?:whois)#i;
my $IPv4_re = qr/(?:[0-9]{1,3}\.){3}(?:[0-9]{1,3})/;

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
    return $ip if (is_ipv4($ip) || $ip =~ /^$IPv6_re$/);
    return;
};

1;
