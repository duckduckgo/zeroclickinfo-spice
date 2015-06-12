package DDG::Spice::Tlds;
#ABSTRACT Returns the country or purpose of a TLD (top level domain). 

use DDG::Spice;
use Data::Validate::Domain qw(is_domain);
use List::Util qw(pairmap);
use URI::Escape;
use DDG::Util::SpiceConstants;


spice proxy_cache_valid => '418 1d';

my $namecheap_endpoint = 'http://api.namecheap.com/xml.response';

# environment variables:
# DDG_SPICE_NAMECHEAP_USERNAME : Namecheap API username
# DDG_SPICE_NAMECHEAP_APIKEY   : Namecheap API key
# DDG_SPICE_NAMECHEAP_IP_ADDR  : Allowed end-User IP address
my @query_list = (
    ApiUser    => 'javathunderman', # Username required to access the API
    ApiKey     => 'bac485f35c51466caed5ff499e585528',   # Password required used to access the API
    UserName   => 'javathunderman', # same as ApiUser
    Command    => 'namecheap.domains.gettldlist',               # API method
    ClientIp   => '0.0.0.0',  # End-user IP address
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



name "TLDs";
source "Namecheap";
icon_url "https://www.namecheap.com/favicon.ico";
description "Returns the country or purpose of a top-level domain (TLD)";
primary_example_queries ".us tld", ".com tld";
secondary_example_queries ".us real tld";

 category "programming";

topics "geek";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TLDs.pm";
attribution github => ["javathunderman", "Thomas Denizou"],
            twitter => "Emposoft";




triggers startend => "tld", "real tld";

my $domain_part_regex = qr|
                          (?:http://)?       
                          (?<domain> [^/]* ) 
                          (?:[^\s])        
                          |x;
handle remainder => sub {
    my $remainder = lc $_;
    return unless $remainder =~ m/(?:https?:\/\/)?(?<domain>[a-z]+)\.(\w+)/;
     $remainder =~ $domain_part_regex;
    my $domain = $+{domain};

    return $domain;
   

    
};

1;
