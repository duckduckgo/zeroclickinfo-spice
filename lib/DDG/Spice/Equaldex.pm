package DDG::Spice::Equaldex;
# ABSTRACT: LGBT rights by region

use DDG::Spice;
use Locale::Country; 

spice is_cached => 1;

name "Equaldex";
source "equaldex";
icon_url "/i/equaldex.com.ico";
description "Show LGBT rights by region";
primary_example_queries "lgbt china";
secondary_example_queries "lesbian rights cyprus", "gay rights china", "bisexual rights australia", "transgender rights spain";
category "location_aware";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Equaldex.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => ["http://chrisjwilson.com", "Chris Wilson"];

spice to => 'http://equaldex.com/api/region?format=json&region=$1&callback={{callback}}';

triggers startend => "lgbt", "lesbian", "gay", "bisexual", "transgender";
my $guardRe = qr/(rights?|laws?) (in)?\s?/;

handle remainder => sub {
    if(m/$guardRe/) {
        my $country = $';
        # Workaround for Locale::Country returning ISO 3166-1 alpha-2 code when using country2code("us(a)")
        $country = "United States" if $country =~ /\busa?\b/; 
        # Return full country name if valid
        return $country if defined country2code($country); 
        # Return country name from ISO 3166-1 alpha-2 code
        if(code2country($country, LOCALE_CODE_ALPHA_2)) {
            return code2country($country, LOCALE_CODE_ALPHA_2);
        }
        # Return country name from ISO 3166-1 alpha-3 code
        if(code2country($country, LOCALE_CODE_ALPHA_3)) {
            return code2country($country, LOCALE_CODE_ALPHA_3);
        }
    }
    return;
};

1;
