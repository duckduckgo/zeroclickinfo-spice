package DDG::Spice::Equaldex;

# ABSTRACT: LGBT rights by region

use DDG::Spice;
use Locale::Country;

spice is_cached => 1;

spice to => 'https://www.equaldex.com/api/region?format=json&region=$1&callback={{callback}}';

triggers startend => "lgbt", "lgbtq", "lesbian", "gay", "bisexual", "transgender";
my $guardRe = qr/(rights?|laws?) (in)?\s?/;

handle remainder => sub {
    if(m/$guardRe/) {
        my $country = $';
        # Workaround for Locale::Country returning ISO 3166-1 alpha-2 code when using country2code("us(a)")
        $country = "united states" if $country =~ /\busa?\b/;
        # Return full country name if valid
        return $country if defined country2code($country);
        # Return country name from ISO 3166-1 alpha-2 code
        if(code2country($country, LOCALE_CODE_ALPHA_2)) {
            return lc code2country($country, LOCALE_CODE_ALPHA_2);
        }
        # Return country name from ISO 3166-1 alpha-3 code
        if(code2country($country, LOCALE_CODE_ALPHA_3)) {
            return lc code2country($country, LOCALE_CODE_ALPHA_3);
        }
    }
    return;
};

1;
