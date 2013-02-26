package DDG::Spice::Airlines;

use DDG::Spice;
use Data::Dumper;

spice to => 'http://www.duckduckgo.com/flights.js?airline=$1&flightno=$2';

triggers query_lc => qr/^(AA) (102)$/i;

handle query_lc => sub {    
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
    
	my $airline = $airlines{$2};
	my $flight_number = $2;
    return $airline, $flight_number;
};

1;