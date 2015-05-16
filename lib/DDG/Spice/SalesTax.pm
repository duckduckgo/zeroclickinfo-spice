package DDG::Spice::SalesTax;
#ABSTRACT: Returns the sales tax for any state (not including territories) in the United States.

use strict;
use DDG::Spice;
use Locale::SubCountry;
use YAML::XS qw( Load );

name "SalesTax";
source "http://taxratesapi.avalara.com/";
description 'Returns the sales tax of the specified state or territory in the United States';
primary_example_queries 'Sales tax for pennsylvania', 'Sales tax pa';
secondary_example_queries 'what is sales tax for mississippi';
topics 'special_interest', 'geography', 'travel';
category 'random';
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SalesTax.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web =>    ["http://chrisjwilson.com", "Chris Wilson"],
            github => ['https://github.com/javathunderman', 'Thomas Denizou'];

triggers any => 'sales tax for', 'sales tax', 'sales tax in';
spice from => '(.*)/(.*)';
spice to => 'https://taxrates.api.avalara.com/postal?country=usa&postal=$1&apikey={{ENV{DDG_SPICE_SALESTAX_APIKEY}}}';
spice wrap_jsonp_callback => 1;

#Create US SubCountry object
my $US = new Locale::SubCountry("US");

#State to Zip Code
my $zipcodes = Load(scalar share('zipcodes.yml')->slurp);

# Handle statement
handle remainder_lc => sub {
    my ($state,$zip); #Define vars
    s/^what is (the)?//g; # strip common words
    return unless $_; # Guard against "no answer"

    # Washington D.C is a district and is not supported by the SubCountry package.
    if(m/\b(washington\s(dc|d\.c))\b/i) {
        $state = "Washington D.C";
    } else {
        # $US->full_name returns the full state name based on the ISO3166 code
        $state = $US->full_name($_); # Check for state using ISO code (PA)
        if($state eq "unknown") {
            $state = $US->full_name($US->code($_)); # If state is "unknown" search for code using full state name (Pennsylvania)
        }
    }

    $zip = $zipcodes->{$state}; # state name=> zip code

    # error checking
    return if $state eq "unknown";
    return unless (defined $state and defined $zip);
    return $zip, $state; # return result
};
1;
