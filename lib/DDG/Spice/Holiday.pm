package DDG::Spice::Holiday;

# ABSTRACT: Query timeanddate.com for a holiday

use strict;
use DDG::Spice;
use Locale::Country;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";
spice wrap_jsonp_callback => 0;

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$1&q=$2&y=$3&callback={{callback}}';

my @triggers  = ('when is', 'what day is');
my $countries = join('|', share("countries.txt")->slurp(chomp => 1));

triggers start => @triggers;

handle remainder_lc => sub {
    my $query = $_;
    return unless $query;

    # Current year and users location are the defaults unless otherwise specified by the query
    my $defaultYear = (localtime(time))[5] + 1900;
    my $defaultCountry = $loc->country_name;

    # Regexes to match components of queries relevant to this IA
    my $country  = qr/$countries/;
    my $year     = qr/[1-9]{1}[0-9]{3}/;
    
    # Regexes to ignore optional words that can precede the year or country name
    my $in       = qr/(?:in )?/;
    my $inThe    = qr/(?:in the |in )?/;

    my $chosenYear;
    my $chosenCountry;
    my $chosenHoliday;

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
     
    # Load the list of holidays for a given country
    my $holidays;
    my $holidayFile = country2code($chosenCountry) . ".hols";
    if (-f "share/spice/holiday/" . $holidayFile) {    
        $holidays = join('|', share($holidayFile)->slurp(chomp => 1));
    } else {        
        return; # Unknown country
    }    

    $query =~ s/(?<holiday>$holidays)//;
    if ($+{holiday}) {
        $chosenHoliday = $+{holiday};
    } else {
        return; # Unknown holiday
    }

    # If there's anything left in the query we can't be sure its relevant
    return unless ($query =~ /^\s*$/);
    
    # These are the min/max years available from the API (as of Feb 2016, API version 2)
    return unless ($chosenYear >= 1600 && $chosenYear <= 2400);
    
    return $chosenCountry, $chosenHoliday, $chosenYear; 
};

1;
