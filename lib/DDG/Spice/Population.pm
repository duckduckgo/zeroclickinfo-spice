package DDG::Spice::Population;
# ABSTRACT: Returns the population of a specified country

use strict;
use DDG::Spice;
use Locale::Country;

name "Population";
source "The World Bank";
icon_url "http://data.worldbank.org/profiles/datafinder/themes/datum/favicon.ico";
description "Returns the population for a specified country";
primary_example_queries "population of brazil", "population mexico";
secondary_example_queries "what is the population of china", "pop of spain";
category "facts";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Population.pm";
attribution github   => ["https://github.com/gregoriomartinez", "GregorioMartinez"],
            twitter  => ['http://twitter.com/gregemartinez','GregEMartinez'],
            web      => ["http://www.gmartinez.com", "Gregorio Martinez"];


# Country alias
Locale::Country::add_country_alias("Lao People's Democratic Republic"  => "Laos");
Locale::Country::add_country_alias('Russian Federation'   => 'Russia');

# Country rename
Locale::Country::rename_country('ae' => 'The United Arab Emirates');
Locale::Country::rename_country('do' => 'The Dominican Republic');
Locale::Country::rename_country('gb' => 'The United Kingdom');
Locale::Country::rename_country('kr' => "The Republic of Korea");                    
Locale::Country::rename_country('kp' => "The Democratic People's Republic of Korea"); 
Locale::Country::rename_country('ky' => 'The Cayman Islands');
Locale::Country::rename_country('mp' => 'The Northern Mariana Islands');
Locale::Country::rename_country('nl' => 'The Netherlands');
Locale::Country::rename_country('ph' => 'The Philippines');
Locale::Country::rename_country('ru' => 'Russia');
Locale::Country::rename_country('tw' => 'Taiwan');
Locale::Country::rename_country('us' => 'The United States');
Locale::Country::rename_country('va' => 'The Holy See (Vatican City State)');
Locale::Country::rename_country('vg' => 'The British Virgin Islands');
Locale::Country::rename_country('vi' => 'The US Virgin Islands');


my $population_qr = qr/(?:population|pop\.?)/;
my $question_qr = qr/(?:what\sis\sthe\s)?/;
my $of_qr = qr/of/;
my $remainder_qr = qr/(.*)/;

my $guard = qr/^$question_qr($population_qr)\s(?:of)?\s?$remainder_qr/;


triggers query_lc => qr/$population_qr/;

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.worldbank.org/countries/$1/indicators/SP.POP.TOTL?per_page=2&MRV=1&format=json';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {

    if (/$guard/) {
        my ($countryName, $countryCode);
        return if ($_ eq '');

        $countryName = $2;

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
    }
    return;
    
};
1;