package DDG::Spice::IsItUp;
# ABSTRACT: Checks if a website is up

use strict;
use DDG::Spice;
use Domain::PublicSuffix;
use Net::IDN::Encode qw(domain_to_ascii domain_to_unicode);
use Net::Domain::TLD qw(tld_exists);
use Data::Validate::IP qw(is_ipv4);


triggers start => "isitup", "isitdown" , "status of","is";
triggers end => "up", "down", "working", "online", "status","up right now","down right now";

spice to => 'https://isitup.org/$1.json?callback={{callback}}';

spice proxy_cache_valid => "418 1d";

handle query_lc  => sub {
    return unless $_ =~ m/^((?:is\s|isitup\s|isitdown\s|status\sof\s|))(?:https?:\/\/)?([\p{Alnum}\-]+(?:\.[\p{Alnum}\-]+)*?)(?:(\.\pL{2,})|)\s(?:up|down|working|online|status|down\sright\snow|up\sright\snow)\?*/;
    my ($domain, $ascii);
    my $publicSuffix = Domain::PublicSuffix->new();
    my $tmpurl = $_;
    $tmpurl=~ s/(?:is\s|isitup\s|isitdown\s|status\sof\s|)|(?:up|down|working|online|status|down\sright\snow|up\sright\snow)|((\s)*)//g;
   
    my $root_url = $tmpurl;
    if ($root_url) {
        my $tld = $root_url;
        $ascii = domain_to_ascii($root_url);
        $domain = $publicSuffix->get_root_domain($ascii);

        if(!$domain) {  #if $domain was undefined, the input url may be incorrect as a whole or only the TLDdi was not found
            $domain = $root_url.$tld if tld_exists(substr $tld, 1);
        }
        return unless $domain;
        return domain_to_unicode($domain);
    }
    else {
        return $root_url if is_ipv4($root_url);
        # append .com
        if ($root_url) {
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
