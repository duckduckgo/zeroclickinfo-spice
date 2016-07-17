package DDG::Spice::Holiday;

# ABSTRACT: Query timeanddate.com for a holiday

use strict;
use DDG::Spice;
use Locale::Country;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";
spice wrap_jsonp_callback => 0;

spice from => '([^/]+)/([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$1&q=$2&y=$3&callback={{callback}}';

my @triggers  = share('holidays.txt')->slurp(chomp => 1);
my $countries = join('|', share('countries.txt')->slurp(chomp => 1));

triggers any => @triggers;

handle query_lc => sub {
    my $query = $_;
    return unless $query;

    # Current year and users location are the defaults unless otherwise specified by the query
    my $defaultYear = (localtime(time))[5] + 1900;
    my $defaultCountry = $loc->country_name;

    # Regexes to match components of queries relevant to this IA
    my $country  = qr/$countries/;
    my $year     = qr/[1-9]{1}[0-9]{3}/;
    my $prefix   = qr/^(when is |what day is )/;
    
    # Regexes to ignore optional words that can precede the year or country name
    my $in       = qr/(?:in )?/;
    my $inThe    = qr/(?:in the |in )?/;

    my $chosenYear;
    my $chosenCountry;
    my $chosenHoliday;
    my $userSpecifiedYear = 0;

    # Remove common prefixes queries for holidays may contain
    $query =~ s/$prefix//;

    # Sanitize the query by replacing non-alphanumeric characters, eg: 
    #   "st. patricks day" -> "st patricks day"
    #   "eid al-fitr" -> "eid al fitr"
    #   "father's day" -> "fathers day"
    $query =~ s/[^\w\s\-]//;
    $query =~ s/-/ /;

    $query =~ s/$in(?<year>$year)//;
    if ($+{year}) {
        $chosenYear = $+{year};
        $userSpecifiedYear = 1;
    } else {
        $chosenYear = $defaultYear;
    }

    $query =~ s/$inThe(?<country>$country)$//;
    if ($+{country}) {
        $chosenCountry = $+{country};
    } else {
        $chosenCountry = $defaultCountry;
    }
     
    # Load the list of holidays for the selected country
    my $holidays;
    my $holidayFile = "countries/" . country2code($chosenCountry) . ".txt";
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
    
    return $chosenCountry, $chosenHoliday, $chosenYear, $userSpecifiedYear; 
};

1;
