package DDG::Spice::Flights;

use DDG::Spice;

primary_example_queries "Jetblue Boston to Los Angeles", "Cathay Pacific Los Angeles to Hong Kong";
secondary_example_queries "Boston to Paris Aer Lingus";
description "Flight information using source and destination cities";
name "Flight Info";
source "flightstats";
icon_url "/ip2/www.flightstats.com.ico";
topics "economy_and_finance", "travel", "everyday";
category "time_sensitive";
code_url "https://github.com/tommytommytommy/zeroclickinfo-spice/lib/DDG/Spice/Flights.pm";
attribution github => ["https://github.com/tommytommytommy", 'tommytommytommy'];

# cache responses for 1 minute
spice proxy_cache_valid => "200 304 1m";

spice from => '(.*)/(.*)/(.*)/(.*)/(.*)/(.*)/(.*)';          
spice to => 'http://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/$2/$3/arr/$4/$5/$6?hourOfDay=$7&utc=true&appId={{ENV{DDG_SPICE_FLIGHTS_API_ID}}}&appKey={{ENV{DDG_SPICE_FLIGHTS_API_KEY}}}&callback={{callback}}';

my @triggers = [];

# get the list of cities and their airport codes
my %cities = ();
foreach my $line (share('cities.csv')->slurp) {

    # remove \n
    chomp($line);
    
    # associate city name with its airport code
    my @line = split(/,/, $line);
    $cities{lc($line[1])} = uc($line[0]);
    
    # store city name as a trigger
    push(@triggers, lc($line[1]));    
}

# get the list of airlines and their ICAO codes
my %airlines = ();
my @airlineTriggers = [];
foreach my $line (share('airlines.csv')->slurp) {

    # remove \n
    chomp($line);
    
    # associate airport name with its ICAO code
    my @line = split(/,/, $line);
    $airlines{lc($line[1])} = uc($line[0]);
    
    # store airline name as a trigger
    push(@triggers, lc($line[1]));
}

triggers startend => @triggers;

handle query_lc => sub {

    # this subfunction looks at either side of a flight query
    # and returns the airline and airport code, if found
    #
    # inputs:
    #   $query is the combined airline/city query that needs to be split
    #   $leftQuery is a boolean that indicates if $query is the source city 
    #   $otherCity is the remainder of the original query on the other side of the 
    #       preposition
    #
    # outputs:
    #   (ICAO airline code, originating city code, destination city code)
    sub identifyCodes {

        my ($query, $leftQuery, $otherCity) = @_;

        # separate by spaces
        my @query = split(/\s+/, $query);

        # at least two words are required (1 for the airline and 1 for the city)
        return if scalar(@query) < 2;

        my @airportCodes = ();
        foreach (0..$#query-1) {

            # scan and separate the query into potential airports and cities
            my $groupA = join(' ', @query[0..$_]);
            my $groupB = join(' ', @query[$_+1..($#query)]);

            for my $airlineName (keys %airlines) {

                push(@airportCodes, "$airlines{$airlineName}")
                    if $leftQuery 
                    and index($airlineName, $groupA) == 0 
                    and exists $cities{$groupB};
                
                push(@airportCodes, "$airlines{$airlineName}")
                    if !$leftQuery 
                    and index($airlineName, $groupB) == 0 
                    and exists $cities{$groupA};                
            }
            
            return (join(",", @airportCodes), $cities{$groupB}, $otherCity) 
                if @airportCodes and $leftQuery;
                
            return (join(",", @airportCodes), $otherCity, $cities{$groupA}) 
                if @airportCodes and !$leftQuery; 
        }
        
        return;
    }

    # trim white spaces at the beginning and end
    s/^\s+|\s+$//;  

    # query must be in the form [airline][city][to][city] or [city][to][city][airline]
    my @query = split(/\s+to\s+/, $_);
    return if scalar(@query) != 2;
    
    # get the current time, minus six hours
    my ($second, $minute, $hour, $dayOfMonth, 
        $month, $year, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time - 21600);

    $month += 1;
    $year += 1900;

    # store ICAO airline and airport codes
    my @flightCodes = ();
    
    # first, check this case: [airline][city][to][city] 
    if (exists $cities{$query[1]}) {
        @flightCodes = identifyCodes($query[0], 1, $cities{$query[1]});    

    # then, check this case: [city][to][city][airline]
    } elsif (exists $cities{$query[0]}) {
        @flightCodes = identifyCodes($query[1], 0, $cities{$query[0]});
    }

    return ($flightCodes[0], $flightCodes[1], $flightCodes[2], $year, $month, $dayOfMonth, $hour) if @flightCodes;
    return;    
};

1;
