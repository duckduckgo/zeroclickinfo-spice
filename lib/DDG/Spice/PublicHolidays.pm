package DDG::Spice::PublicHolidays;

# ABSTRACT: Provides the list of public holidays in a calendar year for a country. 

use strict;
use DDG::Spice;
use Locale::Country;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";
spice wrap_jsonp_callback => 0;

spice from => "(.+)\/(.+)\/.+";
spice to => 'https://api.xmltime.com/holidays?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&version=2&callback={{callback}}&types=federal%2Cfederallocal%2Clocal&country=$1&year=$2';

my @triggers  = ('public holidays', 'national holidays', 'bank holidays', 'federal holidays');
my $triggers  = join('|', @triggers);
my $countries = join('|', share("countries.txt")->slurp(chomp => 1));

triggers any => @triggers;
    
handle query_lc => sub {
    my $query = $_;
    
    # Current year and users location are the defaults unless otherwise specified by the query
    my $defaultYear = (localtime(time))[5] + 1900;
    my $defaultCountry = $loc->country_name;
    
    # Regexes to match components of queries relevant to this IA
    my $holidays = qr/$triggers/;
    my $country  = qr/$countries/;
    my $year     = qr/[1-9]{1}[0-9]{3}/;
    
    # Regexes to ignore optional words that can precede the year or country name
    my $in       = qr/(?:in )?/;
    my $inThe    = qr/(?:in the |in )?/;
    
    my $chosenYear;
    my $chosenCountry;
    
    $query =~ s/$triggers//;
    
    $query =~ s/$in(?<year>$year)//;
    if ($+{year}) {
        $chosenYear = $+{year};
    } else {
        $chosenYear = $defaultYear;
    }
    
    $query =~ s/$inThe(?<country>$country)//;
    if ($+{country}) {
        $chosenCountry = $+{country};
    } else {
        $chosenCountry = $defaultCountry;
    }
   
    # If there's anything left in the query we can't be sure its relevant
    return unless ($query =~ /^\s*$/);
    
    # These are the min/max years available from the API (as of Feb 2016, API version 2)
    return unless ($chosenYear >= 1600 && $chosenYear <= 2400);
    
    my $chosenCountryCode = country2code($chosenCountry);
    return unless ($chosenCountryCode);    
    
    return $chosenCountryCode, $chosenYear, code2country($chosenCountryCode);
};

1;
