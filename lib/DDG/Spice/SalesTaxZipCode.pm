package DDG::Spice::SalesTaxZipCode;
#ABSTRACT: Returns the sales tax for any US 5 digit zipcode. If query has 5 digit zipcode and other trigger word, then it will process.

use strict;
use DDG::Spice;
use Locale::SubCountry;

triggers any => 'sales tax for', 'sales tax in', 'sales tax';
spice to => 'http://dev.snapcx.io:9100/taxv1/salesTaxInfo?request_id=DDG_Requestor&zipcode=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;
#my $zipCodeRegEX = "^[0-9]{5}$";
#Create US SubCountry object
my $US = new Locale::SubCountry("US");

# Handle statement
handle remainder_lc => sub {
    my ($zipcode); #Define vars
    s/^what is (the)?//g; # strip common words
    return $_ if $_ =~ /^[0-9]{5}$/;
    return;
};
1;
