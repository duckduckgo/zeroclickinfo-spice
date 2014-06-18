package DDG::Spice::Domains;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;

# regexes for parsing URLs
my $tlds_qr = qr/com|co|org|ac|ac.uk|in/;
my $url_qr = qr/(?:http:\/\/)?(?:www\.)?([^\s]*?)\.($tlds_qr)/;

# additional keywords that trigger this spice
my $whois_keywords_qr = qr/whois|lookup|(?:is\s|)domain|(?:is\s|)available|register|owner(?:\sof|)|who\sowns|(?:how\sto\s|)buy/i;

# trigger this spice when:
# - query contains only a URL
# - query starts or end with any of the whois keywords
triggers query_raw =>
    qr/^$url_qr$/,
    qr/^$whois_keywords_qr|$whois_keywords_qr$/;

spice to => 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_DOMAINS_USERNAME}}}&password={{ENV{DDG_SPICE_DOMAINS_PASSWORD}}}';

handle  sub {
    my ($query) = @_;
    return if !$query; # do not trigger this spice if the query is blank

    # parse the URL into its parts
    my ($domain, $tld) = $query =~ $url_qr; 
    
    # skip if no domain or tld
    return if !defined $domain || $domain eq '' || !defined $tld || $tld eq '';

    # skip if domain contains a subdomain
    return if $domain =~ /\./;

    # return the domain + the tld, with a period in between
    return "$domain.$tld";
};

1;
