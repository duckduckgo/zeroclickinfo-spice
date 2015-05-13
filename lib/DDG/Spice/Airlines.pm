package DDG::Spice::Airlines;
# ABSTRACT: Information about airplane flights

use strict;
use DDG::Spice;

primary_example_queries "AA 102";
secondary_example_queries "Delta 3684";
description "Flight information";
name "Flight Info";
icon_url "/i/flightstats.com.ico";
source "FlightStats";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Airlines.pm";
topics "economy_and_finance", "travel", "everyday";
category "time_sensitive";
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'DuckDuckGo'];

spice to => 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/$1/$2/arr/$3/$4/$5?hourOfDay=$6&utc=true&appId={{ENV{DDG_SPICE_FLIGHTS_API_ID}}}&appKey={{ENV{DDG_SPICE_FLIGHTS_APIKEY}}}&callback={{callback}}';
spice from => '(.*)/(.*)/(.*)/(.*)/(.*)/(.*)';
spice proxy_cache_valid => '418 1d';

triggers any => '///***never trigger***///';
# triggers query_lc => qr/^(\d+)\s+(.*?)(?:[ ]air.*?)?$|^(.*?)(?:[ ]air.*?)?\s+(\d+)$/;

# Get the list of airlines and strip out the words.
my %airlines = ();
my @airlines_lines = share('airlines.txt')->slurp;
foreach my $line (@airlines_lines) {
  chomp($line);
  my @line = split(/,/, $line);

  $line[1] =~ s/\s+air.*$//i;

  #American (Airlines <- regex removed) => AA
  $airlines{lc $line[1]} = $line[0];
  #AA => AA
  $airlines{lc $line[0]} = $line[0];
}

# Get the list of elements because an airline name can be an element.
my %elements = ();
my @elements_lines = share('symbols.txt')->slurp;
foreach my $line (@elements_lines) {
    chomp $line;
    my @line = split(/,/, $line);
    $elements{$line[0]} = 1;
    $elements{$line[1]} = 1;
}

sub checkAirlines {
    my ($airline, $flightno, $year, $month, $dayOfMonth, $hour) = @_;

    # Check if we found something and if it's not an element.
    if($airline && !exists $elements{$airline}) {
        return $airline, $flightno, $year, $month, $dayOfMonth, $hour;
    } else {
        return;
    }
}

handle query_lc => sub {

    my $query = $_;

    # get the current time, minus six hours
    # the API requires a date/time, and this allows us to search for all flights that 
    # arrived six hours prior to the current time and flights that will arrive up to
    # 18 hours ahead of the current time
    my ($second, $minute, $hour, $dayOfMonth,
        $month, $year, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time - 21600);
                
    $month += 1;
    $year += 1900;

    # 102 AA
    if($query =~ /^(\d+)\s*(.*?)(?:[ ]air.*?)?$/) {
        return checkAirlines($airlines{$2}, $1, $year, $month, $dayOfMonth, $hour);
    # AA 102
    } elsif($query =~ /^(.*?)(?:[ ]air.*?)?\s*(\d+)$/) {
        return checkAirlines($airlines{$1}, $2, $year, $month, $dayOfMonth, $hour);
    }
    return;
};

1;
