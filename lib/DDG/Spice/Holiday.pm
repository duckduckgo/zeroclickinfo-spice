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

# TODO:
# Build this array from share()
# OR find a better way of searching through share dir
my @supported_countries_list = qw(
    ad ae af al am ao ar at au aw az ba bb bd be bf bg bh bi bj bm bo br bs bw
    by ca cd cf cg ch ci cl cm cn co cr cu cv cw cy cz de dj dk do dz ec ee eg
    er es et fi fj fo fr ga gb gd ge gh gi gl gm gn gq gr gt gw hk hn hr ht hu
    id ie il in iq ir is it jm jo jp ke kg kh km kp kr kw ky kz lb li lk lr ls
    lt lu lv ly ma mc md me mg mk ml mn mo mq mt mu mw mx my mz na ne ng ni nl
    no np nz om pa pe ph pk pl pr pt py qa re ro rs ru rw sa sc sd se sg sh si
    sk sl sm sn so sr ss st sv sy sz td tg th tn tr tt tw tz ua ug us uy uz va
    ve vi vn ye yt za zm zw
);
my %supported_countries = map { $_ => 1 } @supported_countries_list;

my @triggers  = sort { length $b <=> length $a } share('holidays.txt')->slurp(chomp => 1);

triggers any => @triggers;

my $triggers_re = join('|', @triggers);
my $countries = join('|', sort { length $b <=> length $a } share('countries.txt')->slurp(chomp => 1));
# Regexes to match components of queries relevant to this IA
my $country_re = qr/\b$countries\b/;
my $year_re = qr/\b[1-9]{1}[0-9]{3}\b/;
my $prefix_re = qr/^(when|what day) is\s+/;

# Regexes to ignore optional words that can precede the year or country name
my $in    = qr/(?:\bin\b)?/;
my $inThe = qr/(?:\bin(?: the)?\b)?/;

handle query_lc => sub {
    return unless $_;
    my $query = $_;

    my ($chosen_year, $chosen_country, $chosen_holiday);
    my $user_specified_year = 0;

    # make sure we have a $loc and country name
    return unless $loc and $loc->country_name;

    # Current year and users location are the defaults unless otherwise specified by the query
    $chosen_year = (localtime(time))[5] + 1900;
    $chosen_country = $loc->country_name;

    # Remove common prefixes queries for holidays may contain
    $query =~ s/$prefix_re//;

    # Sanitize the query by replacing non-alphanumeric characters, eg:
    #   "st. patricks day" -> "st patricks day"
    #   "eid al-fitr" -> "eid al fitr"
    #   "father's day" -> "fathers day"
    $query =~ s/[^\w\s\-]//;
    $query =~ s/-/ /;

    # Extract holiday from query
    $query =~ s/(?<holiday>$triggers_re)//;
    $chosen_holiday = $+{holiday};

    # Extract year from query
    # Do this after holiday because some holidays contain years
    if ($query =~ s/$in ?(?<year>$year_re)//) {
        $chosen_year = $+{year};
        # These are the min/max years available from the API (as of Feb 2016, API version 2)
        return unless ($chosen_year >= 1600 && $chosen_year <= 2400);
        $user_specified_year = 1;
    }

    # Extract country from query
    if ($query =~ s/$inThe ?(?<country>$country_re)$//) {
        $chosen_country = $+{country};
    }

    # Verify we have a country code for chosen country
    return unless my $countryCode = country2code($chosen_country);

    # Ensure we have a list of holidays for the chosen country
    return unless exists $supported_countries{$countryCode};

    # If there's anything left in the query we can't be sure its relevant
    return unless ($query =~ /^\s*$/);

    # Load the list of holidays for the selected country
    my $filePath = "countries/$countryCode.txt";

    return unless (my @lines = share($filePath)->slurp(chomp => 1));
    my %holidays = map { $_ => 1 } @lines;

    # Ensure specified holiday exists for chosen country
    return unless $holidays{$chosen_holiday};

    return $chosen_country, $chosen_holiday, $chosen_year, $user_specified_year;
};

1;
