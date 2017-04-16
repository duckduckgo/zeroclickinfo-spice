package DDG::Spice::Population;
# ABSTRACT: Returns the population of a specified country

use DDG::Spice;
use Locale::Country;

name "Population";
source "The World Bank";
icon_url "http://data.worldbank.org/profiles/datafinder/themes/datum/favicon.ico";
description "Returns the population for a specified country";
primary_example_queries "population of russia ", "population usa";
category "facts";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Population.pm";
attribution github => ["https://github.com/gregoriomartinez", "GregorioMartinez"],
            twitter => ['http://twitter.com/gregemartinez','GregEMartinez'],
            web => ["http://www.gmartinez.com", "Gregorio Martinez"];


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

# Triggers
triggers startend => 'population', 'population of';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/SP.POP.TOTL?per_page=2&MRV=1&format=json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    my ($countryName, $countryCode);
    return if ($_ eq '');
    
    $countryName = shift;

    # Return alpha-3 country code 
    $countryCode = country2code($countryName, LOCALE_CODE_ALPHA_3);
    
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
     
    # Ensure variables are defined before returning a result
    return unless (defined $countryCode and defined $countryName);
    return uc $countryCode, $countryName;
    
};
1;
