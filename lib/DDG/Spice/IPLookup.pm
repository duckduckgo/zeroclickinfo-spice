package DDG::Spice::IPLookup;
# ABSTRACT: Returns information about an IP address

use DDG::Spice;

primary_example_queries "reverse dns 8.8.8.8";
description "Shows reverse DNS information about an IP";
name "IPLookup";
category 'computing_tools';
topics "sysadmin";

attribution github => ['https://github.com/mintsoft', 'mintsoft'],
               web => 'http://www.robtex.com/';

triggers startend => 'reverse dns', 'reverse ip', 'dns', 'whois';

spice to => 'https://www.robtex.com/ext/xapiq/?q=$1&filter=none&s=wip,asip,ddg&r=json';
spice wrap_jsonp_callback => 1;

sub is_ip($)
{
    my ($ip) = @_;
    return undef unless $ip =~ /^([0-9]{1,3}\.){3}([0-9]{1,3})$/;
    my @octlets = split /\./, $ip;
    for (@octlets) {
        return undef if int($_) > 255 || int($_) < 0;
    }
    return $ip;
}

handle remainder => sub {
    s/for|of|lookup//;
    s/\s//;
    return $_ if is_ip($_);
    return;
};

1;
