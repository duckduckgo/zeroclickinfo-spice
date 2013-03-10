package DDG::Spice::Airlines::Airlines;

use DDG::Spice;
use Data::Dumper;

primary_example_queries "AA 102";
secondary_example_queries "Delta 3684";

description "Flight information";
name "Flight";
icon_url "/i/flightaware.com.ico";
source "FlightAware";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Airlines/Airlines.pm";
topics "economy_and_finance", "travel", "everyday";
category "time_sensitive";
attribution github => ['https://github.com/hunterlang','Hunter Lang'],
            web => 'http://hunterlang.com/';

spice to => 'http://www.duckduckgo.com/flights.js?airline=$1&flightno=$2';
spice from => '(.*?)/(.*)';

triggers query_lc => qr/^(\d+)\s*(.*?)(?:[ ]air.*|)$/i;

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

handle query_lc => sub {
    if(exists $airlines{$2}) {
        my $airline = $airlines{$2};
        my $flightno = $1;
        return $airline, $flightno;
    }
    return;
};

1;