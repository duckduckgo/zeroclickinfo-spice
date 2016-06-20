package DDG::Spice::IsItUp;
# ABSTRACT: Checks if a website is up

use strict;
use DDG::Spice;
use Domain::PublicSuffix;
use Net::IDN::Encode qw(domain_to_ascii domain_to_unicode);
use Net::Domain::TLD qw(tld_exists);
use Data::Validate::IP qw(is_ipv4);

triggers query_lc => qr/^((?:is\s|))(?:https?:\/\/)?([\p{Alnum}\-]+(?:\.[\p{Alnum}\-]+)*?)(?:(\.\pL{2,})|)\s(?:up|down|working|online|status)\?*$/i;

spice to => 'https://isitup.org/$1.json?callback={{callback}}';

spice proxy_cache_valid => "418 1d";

handle matches => sub {

    my ($domain, $ascii);
    my $publicSuffix = Domain::PublicSuffix->new();

    if ($_[2]) {
        $ascii = domain_to_ascii($_[1].$_[2]);
        $domain = $publicSuffix->get_root_domain($ascii);

        if(!$domain) {  #if domain is undefined, it may be incorrect as a whole or the TLD was not found
            $domain = $_[1].$_[2] if tld_exists(substr $_[2], 1);
        }
        return if !$domain;
        return domain_to_unicode($domain);
    }
    else {
        return $_[1] if is_ipv4($_[1]);

        # append .com only if "is" is in the query and there's no other domain given
        if ($_[0]) {
            return if length($_[1]) < 5;
            return $_[1] . '.com';
        }
        # otherwise just return without '.com' -- stops false positives from showing zci
        else {
            # check for domain name in the end
            $domain = $publicSuffix->get_root_domain($_[1]);
            return if !$domain;
            return domain_to_unicode($domain);
        }
    }
    return;
};

1;;