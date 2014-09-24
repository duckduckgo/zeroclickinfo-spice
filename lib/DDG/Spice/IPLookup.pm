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

triggers startend => 'ip lookup', 'iplookup', 'reverse dns', 'reverse ip', 'dns', 'whois';

spice to => 'https://www.robtex.com/ext/xapiq/?q=$1&filter=none&s=wip,asip,ddg&r=json';
spice wrap_jsonp_callback => 1;

sub is_ipv4($)
{
    my ($ip) = @_;
    return undef unless $ip =~ /^([0-9]{1,3}\.){3}([0-9]{1,3})$/;
    my @octlets = split /\./, $ip;
    for (@octlets) {
        return undef if int($_) > 255 || int($_) < 0;
    }
    return 1;
}

handle remainder => sub {
    s/for|of|lookup//;
    s/\s//;
    return $_ if (is_ipv4($_) || /^$IPv6_re$/);
    return;
};

1;
