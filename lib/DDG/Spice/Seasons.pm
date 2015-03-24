package DDG::Spice::Seasons;
# ABSTRACT: Return dates for the start of given seasons, solstices, equinoctes

use DDG::Spice;
use Locale::Country qw/country2code/;

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

my @seasons = qw(spring summer autumn winter fall vernal autumnal march june september december);
my $seasons_qr = join "|", @seasons;

triggers any => @seasons;

spice from => "(.+)/(.+)/.*";
spice to => 'https://api.xmltime.com/holidays?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&callback={{callback}}&country=$2&year=$1&types=seasons';

spice proxy_cache_valid => "200 30d";
spice is_cached => 1;

# Seup some common country names and aliases (taken from CallingCodes.pm IA)
Locale::Country::rename_country('ae' => 'the United Arab Emirates');
Locale::Country::rename_country('do' => 'the Dominican Republic');
Locale::Country::rename_country('gb' => 'the United Kingdom');
Locale::Country::rename_country('kr' => "the Republic of Korea");                     # South Korea
Locale::Country::rename_country('kp' => "the Democratic People's Republic of Korea"); # North Korea
Locale::Country::rename_country('ky' => 'the Cayman Islands');
Locale::Country::rename_country('mp' => 'the Northern Mariana Islands');
Locale::Country::rename_country('nl' => 'the Netherlands');
Locale::Country::rename_country('ph' => 'the Philippines');
Locale::Country::rename_country('ru' => 'the Russian Federation');
Locale::Country::rename_country('tw' => 'Taiwan');
Locale::Country::rename_country('us' => 'the United States');
Locale::Country::rename_country('va' => 'the Holy See (Vatican City State)');
Locale::Country::rename_country('vg' => 'the British Virgin Islands');
Locale::Country::rename_country('vi' => 'the US Virgin Islands');

# These are the only 2 countries which officially have 'The' in their name
# Source: http://www.bbc.co.uk/news/magazine-18233844
Locale::Country::rename_country('gm' => 'The Gambia');
Locale::Country::rename_country('bs' => 'The Bahamas');

Locale::Country::add_country_alias('Antigua and Barbuda'  => 'Antigua');
Locale::Country::add_country_alias('Antigua and Barbuda'  => 'Barbuda');
Locale::Country::add_country_alias('Russian Federation'   => 'Russia');
Locale::Country::add_country_alias('Trinidad and Tobago'  => 'Tobago');
Locale::Country::add_country_alias('Trinidad and Tobago'  => 'Trinidad');
Locale::Country::add_country_alias('Vatican City'         => 'Vatican');
Locale::Country::add_country_alias('Virgin Islands, U.S.' => 'US Virgin Islands');

# Source: http://www.bbc.co.uk/news/magazine-18233844
Locale::Country::add_country_alias('United States' => 'America');


# Easter eggs
Locale::Country::add_country_alias('Russian Federation' => 'Kremlin');
Locale::Country::add_country_alias('United States' => 'murica');
Locale::Country::add_country_alias('Canada' => 'Canadia');
Locale::Country::add_country_alias('Australia' => 'down under');

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

    return unless /^(?:(?<year>\d{4}) )?(?:(?:when is the )?(?:(?:first day|start|beginning)) of )?(?<season>$seasons_qr)(?: equinox| solstice)?(?: (?<year>\d{4}))?(?: in (?<country>[\D]+))?(?: (?<year>\d{4}))?$/;

    # Get season
    my $season = $aliases{$+{season}} // $+{season};

    # Get location
    my $country;
    if ($+{country}){
        return unless $country = country2code($+{country});
    } else {
        $country = lc $loc->country_code;
    }

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
    return $year, $country, $season, {is_cached => $caching};

};

1;
