package DDG::Spice::Namecheap;
# ABSTRACT: Queries Namecheap for available domain names.

use DDG::Spice;
use Data::Validate::Domain qw(is_domain);
use List::Util qw(pairmap);
use URI::Escape;

spice proxy_cache_valid => '418 1d';


my $namecheap_endpoint = 'http://api.namecheap.com/xml.response';

# environment variables:
# DDG_SPICE_NAMECHEAP_USERNAME : Namecheap API username
# DDG_SPICE_NAMECHEAP_APIKEY   : Namecheap API key
# DDG_SPICE_NAMECHEAP_IP_ADDR  : Allowed end-User IP address
my @query_list = (
    ApiUser    => '{{ENV{DDG_SPICE_NAMECHEAP_USERNAME}}}', # Username required to access the API
    ApiKey     => '{{ENV{DDG_SPICE_NAMECHEAP_APIKEY}}}',   # Password required used to access the API
    UserName   => '{{ENV{DDG_SPICE_NAMECHEAP_USERNAME}}}', # same as ApiUser
    Command    => 'namecheap.domains.check',               # API method
    ClientIp   => '{{ENV{DDG_SPICE_NAMECHEAP_IP_ADDR}}}',  # End-user IP address
    DomainList => '$1',                                    # argument to method
);

my $query_url = uri_escape("$namecheap_endpoint?") . join( uri_escape('&'), pairmap {
        # the param must always be escaped
        my $param = uri_escape("$a=");
        # the value must not be escaped if it is part of the environment or argument
        my $val = $b;
        "$param$val";
    } @query_list );
spice to => "https://duckduckgo.com/x.js?u=" . $query_url;

spice wrap_jsonp_callback => 1;

# Metadata for this spice
name "Namecheap DNS";
source "Namecheap";
icon_url "https://www.namecheap.com/favicon.ico";
description "Searches for DNS name availability";
primary_example_queries "namecheap example.com", "namecheap ddg.gg";
secondary_example_queries "namecheap http://example.com"; # a query that includes HTTP protocol scheme
category "programming";
topics 'computing', 'geek', 'programming', 'sysadmin';
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Namecheap.pm";
attribution github => ["tejas-manohar", "Tejas Manohar"],
            twitter => "tejasmanohar";

# Triggers
triggers startend => "namecheap";

my $domain_part_regex = qr|
                          (?:http://)?       # HTTP protocol scheme part [optional]
                          (?<domain> [^/]* ) # domain part
                          (?:[^\s]*)         # any path part (e.g., /path/to/file)
                          |x;

# Handle statement
handle remainder => sub {
    my ($remainder) = @_;

    return unless $remainder;    # Guard against "no answer"

    # get the domain part out
    $remainder =~ $domain_part_regex;
    my $domain = $+{domain};

    # must be a valid domain
    return unless is_domain($domain);

    return $domain;
};

1;
