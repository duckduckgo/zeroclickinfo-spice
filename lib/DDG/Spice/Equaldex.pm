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
        return $country if defined country2code($country); # return country name if valid 
        return lc code2country($country) if defined code2country($country); # return country name from 2 letter code
    }
    return;
};

1;
