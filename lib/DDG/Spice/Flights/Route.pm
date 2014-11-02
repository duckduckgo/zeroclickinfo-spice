package DDG::Spice::Flights::Route;

use DDG::Spice;

primary_example_queries "Jetblue Boston to Los Angeles", "Jetblue BOS to LAX";
secondary_example_queries "Newark to Paris United";
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

spice from => '(.*)/(.*)/(.*)/(.*)/(.*)/(.*)/(.*)/(.*)/(.*)';          
spice to => 'http://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/$4/$5/arr/$6/$7/$8?hourOfDay=$9&utc=true&appId={{ENV{DDG_SPICE_FLIGHTS_API_ID}}}&appKey={{ENV{DDG_SPICE_FLIGHTS_API_KEY}}}&callback={{callback}}';

my @triggers = [];

# get the list of cities and their ICAO airport codes
my (%citiesByName, %citiesByCode);

foreach my $line (share('cities.csv')->slurp) {

    # remove \n and separate line into fields
    chomp($line);    
    my @line = split(/,/, $line);

    # map city names to their airport codes; if this city name
    # already exists, append the new airport code to the end
    if (exists $citiesByName{lc($line[4])}) {
        push($citiesByName{lc($line[4])}, lc($line[1]));
    } else {
        $citiesByName{lc($line[4])} = [lc($line[1])];
    }

    # map airport codes to city names
    $citiesByCode{lc($line[1])} = lc($line[4]);
    
    # store both the city name and airport code as triggers
    push(@triggers, (lc($line[4]), lc($line[1]))); 
}

# get the list of airlines and their ICAO codes
my %airlines = ();
foreach my $line (share('airlines.csv')->slurp) {

    # remove \n
    chomp($line);
    
    # associate airport name with its code
    my @line = split(/,/, $line);
    $airlines{lc($line[1])} = lc($line[0]);
}

triggers startend => @triggers;

# identifyCodes(...) looks at either side of a flight query
# and returns the airline and airport code, if found
#
# inputs:
#   [0] $query is the combined airline/city query that needs to be split
#   [1] $leftQuery is a boolean that indicates if $query is the source city 
#   [2][ $otherCity is the remainder of the original query on the other side of the 
#       preposition
#
# outputs:
#   [0] array, ICAO airline codes
#   [1] array, originating IATA airport codes
#   [2] array, destination IATA airport codes
#
# ICAO codes are supposed to be unique, while IATA codes do not have to be.
# As the ICAO codes are only used internally, mapping airlines to their ICAO codes
# makes filtering results easier. However, travelers usually always see an 
# airport's IATA code (e.g., Los Angeles's IATA code is LAX, and its ICAO code is KLAX), 
# so we will match airports by IATA.
sub identifyCodes {

	my ($query, $leftQuery, $otherCity) = @_;

	# split query into individual words
	# at least two words are required (1 for the airline and 1 for the city)
	my @query = split(/\s+/, $query);
	return if scalar(@query) < 2;

    # an ambiguous airline name may return multiple airline codes
    # collect all airline names that begin with the user's query
    my @airlineCodes = ();
	foreach (0..$#query-1) {

        # search query word by word; for example, if the query that we need to
        # parse is "boston to los angeles jetblue", then we check
        # 1) "los" "angeles jetblue"
        # 2) "los angeles" "jetblue"
	    my $groupA = join(' ', @query[0..$_]);
		my $groupB = join(' ', @query[$_+1..($#query)]);

		for my $airlineName (keys %airlines) {

			push(@airlineCodes, uc($airlines{$airlineName}))
				if $leftQuery 
				and index($airlineName, $groupA) == 0 
				and (exists $citiesByName{$groupB} or exists $citiesByCode{$groupB});
		
			push(@airlineCodes, uc($airlines{$airlineName}))
				if !$leftQuery 
				and index($airlineName, $groupB) == 0 
				and (exists $citiesByName{$groupA} or exists $citiesByCode{$groupA});                
		}
		
		# [airline][city][to][city]
		return (join(",", @airlineCodes), $citiesByName{$groupB}, $citiesByName{$otherCity}) 
			if @airlineCodes and $leftQuery and exists $citiesByName{$groupB} and exists $citiesByName{$otherCity};

		# [city][to][city][airline]
		return (join(",", @airlineCodes), $citiesByName{$otherCity}, $citiesByName{$groupA}) 
			if @airlineCodes and !$leftQuery and exists $citiesByName{$otherCity} and exists $citiesByName{$groupA};

        # [airline][airport code][to][airport code]
		return (join(",", @airlineCodes), [$groupB], [$otherCity]) 
			if @airlineCodes and $leftQuery and exists $citiesByCode{$groupB} and exists $citiesByCode{$otherCity};
		
		# [airport code][to][airport code][airline]
		return (join(",", @airlineCodes), [$otherCity], [$groupA]) 
			if @airlineCodes and !$leftQuery and exists $citiesByCode{$otherCity} and exists $citiesByCode{$groupA};		 
	}
	
	return;
}

handle query_lc => sub {

    # query must be in the form [airline][city][to][city] or [city][to][city][airline]
    my @query = split(/\s+to\s+/, $_);
    return if scalar(@query) != 2;
    
    # get the current time, minus six hours
    my ($second, $minute, $hour, $dayOfMonth, 
        $month, $year, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time - 21600);
        
    $month += 1;
    $year += 1900;

    my @flightCodes = ();

    # query format: [airline][city or airline code][to][city or airline code] 
    if (exists $citiesByName{$query[1]} or exists $citiesByCode{$query[1]}) {
        @flightCodes = identifyCodes($query[0], 1, $query[1]);    
    
    # query format: [city or airport code][to][city or airport code][airline]
	} elsif (exists $citiesByName{$query[0]} or exists $citiesByCode{$query[0]}) {
        @flightCodes = identifyCodes($query[1], 0, $query[0]);
    }

    return ($flightCodes[0], 
            join(",", map(uc, @{$flightCodes[1]})),
            join(",", map(uc, @{$flightCodes[2]})),
            uc($flightCodes[1][0]), uc($flightCodes[2][0]), 
            $year, $month, $dayOfMonth, $hour) if @flightCodes;
    
    return;    
};

1;
