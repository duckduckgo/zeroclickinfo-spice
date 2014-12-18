package DDG::Spice::Whois;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;
use Data::Validate::Domain qw(is_domain);
 
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
            github => ["b1ake", 'Blake Jennelle'];

# turns on/off debugging output
my $is_debug = 0;

# additional keywords that trigger this spice
my $whois_keywords_qr = qr/whois|who\sis|lookup|(?:is\s|)domain|(?:is\s|)available|register|owner(?:\sof|)|who\sowns|(?:how\sto\s|)buy/i;

# trigger this spice when the query starts or ends
# with any of the whois keywords.
#
# note that there are additional guards in the handle() function that
# narrow this spice's query space.
#
triggers query_raw =>
    # 2014.09.29 - Removed naked domain triggers to reduce API calls,
    #              because these are mostly navigational queries.
    #
    # allow the naked url with leading and trailing spaces
    #qr/^\s*$url_qr\s*$/,

    # allow the whois keywords at the beginning or end of the string
    # with leading or trailing spaces.
    #
    # if at the end of the string, allow a trailing question mark.
    qr/^\s*$whois_keywords_qr
          |$whois_keywords_qr[?]?\s*$/x;

# API call details for Whois API (http://www.whoisxmlapi.com/)
spice to => 'http://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_WHOIS_USERNAME}}}&password={{ENV{DDG_SPICE_WHOIS_PASSWORD}}}';

handle query_lc => sub {
    my ($query) = @_;
    
    # strip keywords and http(s)
    $query =~ s/https?:\/\/|$whois_keywords_qr|\?//g;

    # trim any leading and trailing spaces
    $query =~ s/^\s+|\s+$//;
    
    return if !$query; # do not trigger this spice if the query is blank
    
    return unless defined $query;

    return lc $query if is_domain $query;
};
1;
