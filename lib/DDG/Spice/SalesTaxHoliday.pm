package DDG::Spice::SalesTaxHoliday;
#ABSTRACT: Returns the sales tax 'holiday' detailed information for any state in the United States.

use strict;
use DDG::Spice;
use Locale::SubCountry;
triggers any => 'holiday sales tax', 'sales tax holiday', 'holiday sales tax in', 'holiday sales tax for', 'sales tax holiday in', 'sales tax holiday for';
spice to => 'http://dev.snapcx.io:9100/taxv1/getTaxHolidayInfo?request_id=DDG_Requestor&state=$1';
spice wrap_jsonp_callback => 1;
#Create US SubCountry object
my $US = new Locale::SubCountry("US");

# Handle statement
handle remainder_lc => sub {
    my ($stateCode); #Define vars
    s/^what is (the)?//g; # strip common words
    return unless $_; # Guard against "no answer"
    
#   return $_ if $_ =~ /^[0-9]{5}$/; #Still thinking, whether to filter or not.
    
    # Washington D.C is a district and is not supported by the SubCountry package.
    if(m/\b(washington\s(dc|d\.c))\b/i) {
       $stateCode = "DC";
    } else {
        # $US->full_name returns the full state name based on the ISO3166 code
        $stateCode = $_;
        if($US->full_name($_) eq "unknown") {
            $stateCode = $US->code($_);
        }
    }
    # error checking
    return unless (defined $stateCode);
    return if $stateCode eq "unknown";
    return uc $stateCode; # return result
};
1;