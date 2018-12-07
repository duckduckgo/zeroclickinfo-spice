package DDG::Spice::Airlines;
# ABSTRACT: Information about airplane flights

use strict;
use DDG::Spice;

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

    # get the current time
    my ($second, $minute, $hour, $dayOfMonth,
        $month, $year, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time);
                
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
