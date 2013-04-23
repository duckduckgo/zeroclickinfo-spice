package DDG::Spice::Airlines;

use DDG::Spice;
use Data::Dumper;

primary_example_queries "AA 102";
secondary_example_queries "Delta 3684";

description "Flight information";
name "Flight";
icon_url "/i/flightaware.com.ico";
source "FlightAware";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Airlines.pm";
topics "economy_and_finance", "travel", "everyday";
category "time_sensitive";
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'duckduckgo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

spice to => 'https://duckduckgo.com/flights.js?airline=$1&flightno=$2&callback={{callback}}';
spice from => '(.*?)/(.*)';

triggers query_lc => qr/\d+/;

#block words unless they're the first word and only if separated by space (excludes TAP-Air)
# grammar - apostrophes specifically: 'chuck's regional charter'
# air, express, airlines, airways, aviation, regional, service, cargo, transport, aircraft, ventures, charter, international, world 
my %airlines = ();
my @airlines_lines = share('airlines.txt')->slurp;

foreach my $line (@airlines_lines) {
  chomp($line);
  my @line = split(/,/, $line);

  $line[1] =~ s/\s+air.*$//i;

  $airlines{lc $line[1]} = $line[0]; #American (Airlines <- regex removed) => AA
  $airlines{lc $line[0]} = $line[0]; #AA => AA
}

my %elements = ();
my @elements_lines = share('symbols.txt')->slurp;
foreach my $line (@elements_lines) {
    chomp $line;
    my @line = split(/,/, $line);
    $elements{$line[0]} = 1;
    $elements{$line[1]} = 1;
}

handle query_lc => sub {
    my $query = $_;
    my $airline;
    my $flightno;

    if($query =~ /^(\d+)\s*(.*?)(?:[ ]air.*|)$/) {
        $airline = $airlines{$2};
        $flightno = $1;
        if(length($2) > 2 && !exists $elements{$2} && exists $airlines{$2}) {
            return $airline, $flightno;
        } elsif(length($2) == 2 && !exists $elements{$2} && exists $airlines{$2}) {
            return $airline, $flightno;
        }
    } elsif($query =~ /^(.*?)(?:[ ]air.*|)?\s*(\d+)$/) {
        $airline = $airlines{$1};
        $flightno = $2;
        if(length($1) > 2 && !exists $elements{$1} && exists $airlines{$1}) {
            return $airline, $flightno;
        } elsif(length($1) == 2 && !exists $elements{$1} && exists $airlines{$1}) {
            return $airline, $flightno;
        }
    }
    return;
};

1;