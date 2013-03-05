package DDG::Spice::Airlines::Airlines2;

use DDG::Spice;
use Data::Dumper;

spice to => 'http://www.duckduckgo.com/flights.js?airline=$1&flightno=$2';
spice from => '(.*?)/(.*)';

triggers query_lc => qr/^(.*?)(?:[ ]air.*?)?\s*(\d+)$/i;

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
    $elements{lcfirst($line)} = undef;
}

handle query_lc => sub {
    if(exists $airlines{$1} && !exists $elements{substr($1, 0, 2)}) {
        my $airline = $airlines{$1};
        my $flightno = $2;
        return $airline, $flightno;
    }
    return;
};

1;