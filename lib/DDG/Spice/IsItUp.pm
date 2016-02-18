package DDG::Spice::IsItUp;
# ABSTRACT: Checks if a website is up

use strict;
use DDG::Spice;
use DDG::Util::SpiceConstants;

triggers query_lc => qr/^((?:is\s|))(?:https?:\/\/)?([0-9a-z\-]+(?:\.[0-9a-z\-]+)*?)(?:(\.[a-z]{2,4})|)\s(?:up|down|working|online|status)\?*$/i;

spice to => 'https://isitup.org/$1.json?callback={{callback}}';

spice proxy_cache_valid => "418 1d";

my $regex_domain = qr/\.(@{[ DDG::Util::SpiceConstants::TLD_REGEX  ]})$/;
my $regex_ipv4 = qr/^(?:\d{1,3}\.){3}\d{1,3}$/;

handle matches => sub {
    if ($_[2]) {
        my $root_url = $_[1];
        my $domain = $_[2];
        # return the domain and the root url if the domain is valid
        if ($domain =~ $regex_domain){
            return $root_url.$domain;
        }
    }
    else {
        return $_[1] if $_[1] =~ $regex_ipv4;
        # append .com only if "is" is in the query and there's no other domain given
        if ($_[0]) {
            return if length($_[1]) < 5;
            return $_[1] . '.com';
        }
        # otherwise just return without '.com' -- stops false positives from showing zci
        else {
            # check for domain name in the end
            if ($_[1] =~ $regex_domain) {
                return $2;
            }
        }
    }
    return;
};

1;
