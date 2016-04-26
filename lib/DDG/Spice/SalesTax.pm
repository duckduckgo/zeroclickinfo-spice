package DDG::Spice::SalesTax;
#ABSTRACT: Returns the sales tax for any state (not including territories) in the United States.

use strict;
use DDG::Spice;
use Locale::SubCountry;

triggers any => 'sales tax for', 'sales tax in', 'sales tax';
spice to => 'http://dev.snapcx.io:9100/taxv1/getStateTaxRate?request_id=DDG_Requestor&state=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;

#Create US SubCountry object
my $US = new Locale::SubCountry("US");

# Handle statement
handle remainder_lc => sub {

# No need to check US country, as this IA will run for all international users. I am still keeping commented out code as FYI.
#    return unless $loc && $loc->{country_code} eq 'US';

    my ($state, $stateCode); #Define vars
    s/^what is (the)?//g; # strip common words
    return unless $_; # Guard against "no answer"
    
   # Guard against, to sending zipcodes as parameters. We have different IA. 
   if ($_ =~ /^[0-9]{5}$/){
      return;
    }
    # Guard against, sales tax holiday. We have different IA.
    if ($_ =~ /((?i)holiday)/){
      return;
    }


    # Washington D.C is a district and is not supported by the SubCountry package.
    if(m/\b(washington\s(dc|d\.c))\b/i) {
        $state = "Washington D.C";
        $stateCode = "DC";
    } else {
        # $US->full_name returns the full state name based on the ISO3166 code
        $stateCode = $_;
        $state = $US->full_name($_); # Check for state using ISO code (PA)
        if($state eq "unknown") {
            $state = $US->full_name($US->code($_)); # If state is "unknown" search for code using full state name (Pennsylvania)
            $stateCode = $US->code($_);
        }
    }

    # error checking
    return if $state eq "unknown";
    return unless (defined $state and $stateCode);
    return $stateCode; # return result
};
1;