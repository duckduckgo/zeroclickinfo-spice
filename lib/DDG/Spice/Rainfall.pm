package DDG::Spice::Rainfall;
# ABSTRACT: Returns the annual rainfall (precipitation) of the country searched 

use strict;
use DDG::Spice;
use Locale::Country; 

primary_example_queries "rainfall australia";
secondary_example_queries "australia annual rainfall";
description "Shows annual rainfall";
name "Rainfall";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rainfall.pm";
topics "everyday";
category "geography";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => ["http://chrisjwilson.com", "Chris Wilson"];
triggers any => "rainfall", "rainfall in", "annual rainfall", "annual rainfall in", "average rainfall", "average annual rainfall", "average rainfall in";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/AG.LND.PRCP.MM?&date=$2&format=json';
spice wrap_jsonp_callback => 1;

# Country alias
Locale::Country::add_country_alias("Lao People's Democratic Republic"  => "Laos");
Locale::Country::add_country_alias('Russian Federation'   => 'Russia');

# Country rename
Locale::Country::rename_country('ae' => 'the United Arab Emirates');
Locale::Country::rename_country('do' => 'the Dominican Republic');
Locale::Country::rename_country('gb' => 'the United Kingdom');
Locale::Country::rename_country('kr' => "the Republic of Korea");                    
Locale::Country::rename_country('kp' => "the Democratic People's Republic of Korea"); 
Locale::Country::rename_country('ky' => 'the Cayman Islands');
Locale::Country::rename_country('mp' => 'the Northern Mariana Islands');
Locale::Country::rename_country('nl' => 'the Netherlands');
Locale::Country::rename_country('ph' => 'the Philippines');
Locale::Country::rename_country('ru' => 'the Russian Federation');
Locale::Country::rename_country('tw' => 'Taiwan');
Locale::Country::rename_country('us' => 'the United States');
Locale::Country::rename_country('va' => 'the Holy See (Vatican City State)');
Locale::Country::rename_country('vg' => 'the British Virgin Islands');
Locale::Country::rename_country('vi' => 'the US Virgin Islands');


# Current date and time
my $curYear = (localtime)[5] + 1900;

# Vaild reporting dates for AG.LND.PRCP.MM indicator (every 5 years)
my @reportingDates = (2012,2017,2022,2027,2032);

handle remainder_lc => sub {
    my ($validDate, $countryName, $countryCode, $countryCodeTwo);
    return if ($_ eq '');
    
    $countryName = shift;
    $countryCode = country2code($countryName, LOCALE_CODE_ALPHA_3); # Return alpha-3 country code 
    
    if($countryCode) {
        $countryName = code2country(country2code($countryName, LOCALE_CODE_ALPHA_2), LOCALE_CODE_ALPHA_2);
    } else {
        $countryName = code2country(country2code(code2country($countryName, LOCALE_CODE_ALPHA_3), LOCALE_CODE_ALPHA_2), LOCALE_CODE_ALPHA_2);
        $countryCode = country2code($countryName, LOCALE_CODE_ALPHA_3);
    }
  
    return unless defined $countryName;
    
    # Check if the country string has a comma, split the string and only include the first element
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