package DDG::Spice::PublicHolidays;

# ABSTRACT: Provides the list of public holidays in a calendar year for a country. 

use strict;
use DDG::Spice;
use Locale::Country;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";
spice wrap_jsonp_callback => 0;

spice from => "(.+)/(.+)";
spice to => 'https://api.xmltime.com/holidays?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&version=2&callback={{callback}}&types=federal&country=$1&year=$2';

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
    
    # Match: <trigger>
    if ( $query =~ /^$holidays$/ ) {
        $chosenYear = $defaultYear;
        $chosenCountry = $defaultCountry;
    }
    
    # Match: <trigger> <country>
    elsif ( $query =~ /^$holidays $inThe($country)$/ ) {
        $chosenYear = $defaultYear;
        $chosenCountry = $1;
    }
    
    # Match: <trigger> <year>
    elsif ( $query =~ /^$holidays $in($year)$/ ) {
        $chosenYear = $1;
        $chosenCountry = $defaultCountry;
    }
    
    # Match: <country> <trigger>
    elsif ( $query =~ /^($country) $holidays$/ ) {
        $chosenYear = $defaultYear;
        $chosenCountry = $1;
    }
    
    # Match: <year> <trigger>
    elsif ( $query =~ /^($year) $holidays$/ ) {
        $chosenYear = $1;
        $chosenCountry = $defaultCountry;
    }
    
    # Match: <trigger> <country> <year>
    elsif ( $query =~ /^$holidays $inThe($country) $in($year)$/ ) {
        $chosenYear = $2;
        $chosenCountry = $1;
    }
    
    # Match: <trigger> <year> <country>
    elsif ( $query =~ /^$holidays $in($year) $inThe($country)$/ ) {
        $chosenYear = $1;
        $chosenCountry = $2;
    }
    
    # Match: <country> <trigger> <year>
    elsif ( $query =~ /^($country) $holidays $in($year)$/ ) {
        $chosenYear = $2;
        $chosenCountry = $1;
    }
    
    # Match: <country> <year> <trigger>
    elsif ( $query =~ /^($country) ($year) $holidays$/ ) {
        $chosenYear = $2;
        $chosenCountry = $1;
    }
    
    # Match: <year> <trigger> <country>
    elsif ( $query =~ /^($year) $holidays $inThe($country)$/ ) {
        $chosenYear = $1;
        $chosenCountry = $2;
    }
    
    # Match: <year> <country> <trigger>
    elsif ( $query =~ /^($year) ($country) $holidays$/ ) {
        $chosenYear = $1;
        $chosenCountry = $2;
    }
    
    # No matches
    else {
        return; 
    }
    
    # These are the min/max years available from the API (Feb 2016, API version 2)
    return unless($chosenYear >= 1600 && $chosenYear <= 2400);
    
    my $chosenCountryCode = country2code($chosenCountry);
    return unless($chosenCountryCode);    
    
    return $chosenCountryCode, $chosenYear, code2country($chosenCountryCode);
};

1;
