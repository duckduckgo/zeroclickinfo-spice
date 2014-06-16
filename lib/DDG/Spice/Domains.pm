package DDG::Spice::Domains;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;

my $tlds_qr = qr/com|co|org|ac|ac.uk|in/;
my $url_qr = qr/^(?:http:\/\/)?(?:www\.)?(.*?)\.($tlds_qr)$/;

# trigger when query contains only a URL
triggers query_raw => $url_qr;

# TODO: add other triggers into the qr above, such as 'whois', 'domain', 'available', 'is available'

my $api_user = 'USERNAME_HERE';
my $api_pwd = 'PWD_HERE';
spice to => 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username=' . $api_user . '&password=' . $api_pwd;

handle  sub {
    my ($query) = @_;
    return if !$query; # do not trigger this spice if the query is blank

    # parse the URL into its parts
    my ($domain, $tld) = $query =~ $url_qr; 
    
    warn $domain . '', "\t", $tld . '';

    # skip if no domain or tld
    return if !defined $domain || $domain eq '' || !defined $tld || $tld eq '';

    # skip if domain contains a subdomain
    return if $domain =~ /\./;

    # return the domain + the tld, with a period in between
    return "$domain.$tld";
};

1;
