package DDG::Spice::Seasons;
# ABSTRACT: Return dates for the start of given seasons, solstices, equinoctes

use DDG::Spice;
use Locale::Country qw/country2code/;

my @seasons = qw(spring summer autumn winter fall vernal autumnal march june september december);
my $seasons_qr = join "|", @seasons;

triggers any => @seasons;

spice from => "(.+)/(.+)/.+/.*";
spice to => 'https://api.xmltime.com/holidays?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&callback={{callback}}&country=$2&year=$1&types=seasons';

spice proxy_cache_valid => "200 30d";
spice is_cached => 1;

# Note: In 2014, Timeanddate.com API returned results for 1695 through 2290. 319 years into past, 76 years into future.
use constant {
    YEARS_INTO_FUTURE => 276,
    API_EPOCH => 1965
};

# Common aliases
my %aliases = (
    'march'     => 'spring',
    'vernal'    => 'spring',
    'june'      => 'summer',
    'september' => 'autumn',
    'fall'      => 'autumn',
    'autumnal'  => 'autumn',
    'december'  => 'winter'
);

# Handle statement
handle query_lc => sub {

    return unless /^(?:(?<year>\d{4}) )?(?:(?:when is the ))?(?:(?:first day|start|beginning) of )?(?<season>$seasons_qr)(?: equinox| solstice)?(?: (?<year>\d{4}))?(?: in (?<country>[\D]+))?(?: (?<year>\d{4}))?$/;

    # Get season
    my $season = $aliases{$+{season}} // $+{season};

    # Get location
    my $country;
    if ($+{country}){
        return unless $country = country2code($+{country});
    } else {
        $country = lc $loc->country_code;
    }

    # Get hemisphere
    my $hemisphere = ($loc->latitude > 0) ? 'north' : 'south';


    # Detect year
    my $current_year = (localtime(time))[5] + 1900;
    my $year = $+{year} // $current_year;

    # Keep year within API limits
    return unless (defined $year && $year >= API_EPOCH && $year <= ($current_year + YEARS_INTO_FUTURE));

    # Make sure all required parameters are set
    return unless (defined $year && defined $country && defined $season);

    my $caching = 0;

    # Cache queries that specify year and country
    if ($+{country} && $+{year}) {
        $caching = 1;
    }

    # Season is not required for the API call, but used in the frontend
    return $year, $country, $season, $hemisphere, {is_cached => $caching};

};

1;
