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

# additional keywords that trigger this spice
my $whois_keywords_qr = qr/whois|who\sis|lookup|(?:is\s|)domain|(?:is\s|)available|register|owner(?:\sof|)|who\sowns|(?:how\sto\s|)buy/i;

# allow the whois keywords at the beginning or end of the string with leading or trailing spaces.
# if at the end of the string, allow a trailing question mark.
triggers query_raw =>qr/^\s*$whois_keywords_qr|$whois_keywords_qr[?]?\s*$/x;

# API call details for Whois API (http://www.whoisxmlapi.com/)
spice to => 'http://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_WHOIS_USERNAME}}}&password={{ENV{DDG_SPICE_WHOIS_PASSWORD}}}';

handle query_lc => sub {

    my $domain;
    my $publicSuffix = Domain::PublicSuffix->new();
    
    s/https?:\/\/|$whois_keywords_qr|\?//g; # strip keywords and http(s)
    trim($_); # trim any leading and trailing spaces
    s/\:?[0-9]{1,4}?//g; # look for a port, such as :3000
    if(m/\//) { 
        s|[^/]+$||; # if we have /about.html or other remove it
        s/\/$//g; # remove the left over slash
    }

    return if !$_; # do not trigger this spice if the query is blank

    $domain = $publicSuffix->get_root_domain($_); # get the root domain assuming we have that left in our query
    return if !$domain;
    return $domain;

};
1;
