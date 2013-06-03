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

handle query_lc => sub {
    my $query = $_;

    sub checkAirlines {
        my ($airline, $flightno, $original) = @_;

        # Check if we found something and if it's not an element.
        if($airline && !exists $elements{$airline}) {
            return $airline, $flightno;
        } else {
            return;
        }
    }

    # 102 AA

    if($query =~ /^(\d+)\s*(.*?)(?:[ ]air.*?)?$/) {
        return checkAirlines($airlines{$2}, $1, $2);
    # AA 102
    } elsif($query =~ /^(.*?)(?:[ ]air.*?)?\s*(\d+)$/) {
        return checkAirlines($airlines{$1}, $2, $1);
    }
    return;
};

1;