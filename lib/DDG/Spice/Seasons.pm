package DDG::Spice::Seasons;
# ABSTRACT: Return dates for the start of given seasons, solstices, equinoctes

use DDG::Spice;
use YAML::XS qw( Load );

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
spice is_cached => 0;

# Handle statement
handle remainder => sub {
    use constant SPRING => 'spring';
    use constant SUMMER => 'summer';
    use constant AUTUMN => 'autumn';
    use constant WINTER => 'winter';

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

    if (/(\d{4})/) {
        $year = $1;
    } else {
        my $tmp;
        ($tmp, $tmp, $tmp, $tmp, $tmp, $year, $tmp, $tmp, $tmp) = localtime(time);
        $year += 1900;
    }

    # Season is not required for the API call, but used in the frontend
    return $year, $country, $season;

};

1;
