package DDG::Spice::Rainfall;
# ABSTRACT: Returns the annual rainfall (precipitation) of the country searched 

use DDG::Spice;
use Locale::Country; 

primary_example_queries "rainfall australia";
secondary_example_queries "australia annual rainfall";
description "Shows annual rainfall";
name "Rainfall";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rainfall.pm";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];
triggers any => "rainfall", "rainfall in", "annual rainfall", "annual rainfall in";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/AG.LND.PRCP.MM?&date=$2&format=json';
spice wrap_jsonp_callback => 1;

# Current date and time
my @localT = localtime;
my $curYear = $localT[5] + 1900;

# Vaild reporting dates for AG.LND.PRCP.MM indicator (every 5 years)
my @reportingDates = (2012,2017,2022,2027,2032);

handle remainder_lc => sub {
    my ($validDate, $countryName, $countryCode);
    return if ($_ eq '');
    $countryName = shift;
    $countryCode = country2code($countryName, LOCALE_CODE_ALPHA_3); # Return alpha-3 country code 
    $countryName = code2country($countryCode, LOCALE_CODE_ALPHA_3); # Return country name from country code
    
    # Check if the country string has a comma, split the string and only include the first element
    return unless defined $countryName;
    if (index($countryName, ',') != -1) {
        ($countryName) = split(',', $countryName);
    }
     
    # Loop to check valid reporting dates against current date
    foreach my $date (@reportingDates){
          if($curYear >= $date) {
          $validDate = join(':', $date,$date);
         }
    }      
    # Ensure variables are defined before returning a result
    return unless (defined $countryCode and defined $validDate and defined $countryName);
    return uc $countryCode, $validDate, $countryName;
    
};
1;