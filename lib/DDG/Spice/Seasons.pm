package DDG::Spice::Seasons;
# ABSTRACT: Return dates for the start of given seasons, solstices, equinoctes

use DDG::Spice;

name "Seasons";
description "Provides dates for the start of given seasons, solstices, equinoctes";
primary_example_queries "first day of spring", "summer solstice";
secondary_example_queries "first day of fall";
category "dates";
topics "everyday", "trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Seasons.pm";
icon_url "/i/timeanddate.com.ico";
attribution web => ["http://oyam.ca", "Mayo Jordanov"],
            github => ["mayo", "Mayo Jordanov"],
            twitter => "oyam";

triggers start => "first day", "start";
triggers any => "solstice", "equinox";

spice from => "(.+)/(.+)/.*";
spice to => 'https://api.xmltime.com/holidays?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&callback={{callback}}&country=$2&year=$1&types=seasons';

spice proxy_cache_valid => "418 30d";
spice is_cached => 0;

# Handle statement
handle remainder_lc => sub {
    use constant SPRING => 'spring';
    use constant SUMMER => 'summer';
    use constant AUTUMN => 'autumn';
    use constant WINTER => 'winter';

    # Note: In 2014, Timeanddate.com API returned results for 1695 through 2290. 319 years into past, 76 years into future.
    use constant YEARS_INTO_FUTURE => 276;
    use constant API_EPOCH => 1965;

    # Common season aliases
    my %seasons = (
        'spring' => SPRING,
        'vernal' => SPRING,
        'mar' => SPRING,

        'summer' => SUMMER,
        'jun' => SUMMER,

        'autumn' => AUTUMN,
        'fall' => AUTUMN,
        'sep' => AUTUMN,

        'winter' => WINTER,
        'dec' => WINTER
    );

    # Detect season
    my $keywords = join("|", (keys %seasons));
    return unless /($keywords)/;
    my $season =  $seasons{$1};

    # Get location
    my $country = lc $loc->country_code;

    # Detect year
    my $year;
    my $current_year = (localtime(time))[5] + 1900;

    if (/(\d{4})/) {
        $year = $1;
    } else {
        $year = $current_year;
    }

    # Keep year within API limits
    return unless (defined $year and $year >= API_EPOCH and $year <= ($current_year + YEARS_INTO_FUTURE));

    # Make sure all required parameters are set
    return unless (defined $year and defined $country and defined $season);

    # Season is not required for the API call, but used in the frontend
    return $year, $country, $season;

};

1;
