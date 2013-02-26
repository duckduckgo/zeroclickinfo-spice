package DDG::Spice::Airlines2;

use DDG::Spice;
use Data::Dumper;

spice to => 'http://www.duckduckgo.com/flights.js?airline=$1&flightno=$2';
spice from => '(.*?)/(.*)';

triggers query_lc => qr/^(.*?)(?:[ ]air.*?)?\s*(\d+)$/i;

handle query_lc => sub {
    warn $2;

    #block words unless they're the first word and only if separated by space (excludes TAP-Air)
    # grammar - apostrophes specifically: 'chuck's regional charter'
    # air, express, airlines, airways, aviation, regional, service, cargo, transport, aircraft, ventures, charter, international, world 
    my %airlines = ();
    open(IN, "</usr/local/ddg/sources/flightstats/airlines.txt");
    while (my $line = <IN>) {
      chomp($line);
      my @line = split(/,/, $line);

      $line[1] =~ s/\s+air.*$//i;
      $airlines{lc $line[1]} = $line[0]; #American (Airlines <- regex removed) => AA
      $airlines{lc $line[0]} = $line[0]; #AA => AA
    }
    close(IN);
    
    my %elements = ();
    open (IN, "</usr/local/ddg/sources/elements/symbols.txt");
    while (my $l = <IN>) {
        warn $l;
        chomp $l;         
        $elements{lcfirst($l)} = undef;
    }
    close(IN);

    if(exists $airlines{$1} && !exists $elements{substr($1, 0, 2)}) {
        my $airline = $airlines{$1};
        my $flightno = $2;
        return $airline, $flightno;
    }
    return;
};

1;