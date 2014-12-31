package DDG::Spice::Whois;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;
use Domain::PublicSuffix;
use Text::Trim;

# Metadata for this spice
name 'Whois';
source 'Whois API';
description 'Whois info and registration links for web domains';
primary_example_queries 'whois duckduckgo.com', 'whois http://duckduckgo.com';
secondary_example_queries 'domain duckduckgo.com', 'who owns duckduckgo.com', 'duckduckgo.com available';
category 'programming';
topics 'computing', 'geek', 'programming', 'sysadmin';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Whois.pm';

attribution twitter => 'bjennelle',
            github => ["b1ake", 'Blake Jennelle'],
            github => ["chrisjwilsoncom", 'Chris Wilson']; 

triggers any => "whois", "lookup", "domain", "is domain", "available", "is available", "register", "owner", "owner of", "who owns", "buy", "how to buy";

# API call details for Whois API (http://www.whoisxmlapi.com/)
spice to => 'http://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_WHOIS_USERNAME}}}&password={{ENV{DDG_SPICE_WHOIS_PASSWORD}}}';

handle remainder_lc => sub {

    my $domain;
    my $publicSuffix = Domain::PublicSuffix->new();
    
    s/https?:\/\/|\?//g; # strip keywords and http(s) and question mark
    s/\:?[0-9]{1,4}?//g; # strip ports, such as :3000

    if ( /\s/ ) { 
        s/\bis\b|\bfor\b//g # if space, strip additional words
    }

    if(m/\//) { 
        s|[^/]+$||; # if we have /about.html or other remove it
        s/\/$//g; # remove the left over slash
    }

    trim($_); # trim any leading and trailing spaces

    if ( /\s/ ) { return; } # do not trigger if the query still contains spaces

    return if !$_; # do not trigger this spice if the query is blank

    $domain = $publicSuffix->get_root_domain($_); # get the root domain assuming we have that left in our query
    return if !$domain;
    return $domain;

};
1;
