package DDG::Spice::IsItUp;
# ABSTRACT: Checks if a website is up

use strict;
use DDG::Spice;
use Domain::PublicSuffix;
use Net::IDN::Encode qw(domain_to_ascii domain_to_unicode);
use Net::Domain::TLD qw(tld_exists);
use Data::Validate::IP qw(is_ipv4);


triggers start => "isitup", "isitdown" , "is";
triggers end => "up", "down", "working", "online", "status";


spice to => 'https://isitup.org/$1.json?callback={{callback}}';

spice proxy_cache_valid => "418 1d";

handle matches => sub {
    return unless $_ =~ /^((?:is\s|isitup\s|isitdown\s|))(?:https?:\/\/)?([\p{Alnum}\-]+(?:\.[\p{Alnum}\-]+)*?)(?:(\.\pL{2,})|)\s(?:up|down|working|online|status)\?*$/i;
    my ($domain, $ascii);
    my $publicSuffix = Domain::PublicSuffix->new();

    my $root_url = $_[1];

    if ($_[2]) {
        my $tld = $_[2];
        $ascii = domain_to_ascii($root_url.$tld);
        $domain = $publicSuffix->get_root_domain($ascii);

        if(!$domain) {  #if $domain was undefined, the input url may be incorrect as a whole or only the TLD was not found
            $domain = $root_url.$tld if tld_exists(substr $tld, 1);
        }
        return unless $domain;
        return domain_to_unicode($domain);
    }
    else {
        return $root_url if is_ipv4($root_url);

        # append .com only if "is" is in the query and there's no other domain given
        if ($_[0]) {
            return if length($root_url) < 5;
            return $root_url . '.com';
        }
        # otherwise just return without '.com' -- stops false positives from showing zci
        else {
            # check for domain name in the end
            $domain = $publicSuffix->get_root_domain($root_url);
            return if !$domain;
            return domain_to_unicode($domain);
        }
    }
    return;
};

1;
