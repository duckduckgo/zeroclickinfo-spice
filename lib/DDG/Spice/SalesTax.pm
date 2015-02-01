package DDG::Spice::SalesTax;
#ABSTRACT: Returns the sales tax for any state (not including territories) in the United States. 

use DDG::Spice;
use Locale::SubCountry;

spice is_cached => 1;

name "SalesTax";
source "http://taxratesapi.avalara.com/";
description 'Returns the sales tax of the specified state or territory in the United States';
primary_example_queries 'Sales tax for pennsylvania', 'Sales tax pa';
secondary_example_queries 'what is sales tax for mississippi';
topics 'special_interest', 'geography', 'travel';
category 'random';
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SalesTax.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => 	  ["http://chrisjwilson.com", "Chris Wilson"],
            github => ['https://github.com/javathunderman', 'Thomas Denizou'];

triggers any => 'sales tax for', 'sales tax', 'sales tax in';
#Example
#https://taxrates.api.avalara.com:443/address?street=435+Ericksen+Ave+NE&city=Bainbridge%20Island&state=WA&postal=98110&apikey={{ENV{DDG_SPICE_SALESTAX_APIKEY}}}
spice to => 'https://taxrates.api.avalara.com:443/address?state=$1&apikey={{ENV{DDG_SPICE_SALESTAX_APIKEY}}}';

#Create US SubCountry object
my $US = new Locale::SubCountry("US");

# Handle statement
handle remainder => sub {
	my ($query,$state); #Define vars
	s/^what is (the)?//g; # strip common words
	$query = $_;
    return unless $query;    # Guard against "no answer"
    # $US->full_name returns the full state name based on the ISO3166 code 
    $state = $US->full_name($query); # Check for state using ISO code (PA)
    if($state eq "unknown") {
        $state = $US->full_name($US->code($query)); # If state is "unknown" search for code using full state name (Pennsylvania)
	}
    return if $state eq "unknown";
    return unless $state;
    return $state;
};

1;
