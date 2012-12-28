package DDG::Spice::Dns;
# ABSTRACT: Gets IP address of given domain name.

use DDG::Spice;
use Data::Validate::Domain qw(is_domain);

spice to => 'http://pro.viewdns.info/dnsrecord/?domain=$1&recordtype=A&apikey={{ENV{DDG_SPICE_VIEWDNS_APIKEY}}}&output=json';

spice wrap_jsonp_callback => 1;

primary_example_queries 'dns viewdns.info';
description 'IP address of domain';
name 'Dns';
attribution github => ['https://www.github.com/OndroNR', 'Ondrej Galbavy'],
            twitter => ['https://www.twitter.com/OndroNR', 'Ondrej Galbavy'];

triggers start => 'dns';

handle remainder => sub {
	my $valid = is_domain($_);
	return $_ if $valid;
	return;
#	return $_;
};

1;
