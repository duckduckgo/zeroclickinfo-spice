package DDG::Spice::Domains;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;

triggers startend =>
	'whois',
    'domain availabile',
    'buy domain';

my $api_user = 'USERNAME_HERE';
my $api_pwd = 'PWD_HERE';
spice to => 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username=' . $api_user . '&password=' . $api_pwd;

handle remainder => sub {
	my ($domain) = @_;
   	return if !$domain; # do not trigger AI if domain is blank
    
    return $domain;
};

1;