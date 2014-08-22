package DDG::Spice::SEPTA;

use DDG::Spice;

primary_example_queries "next train from Villanova to Paoli";
secondary_example_queries "train times to paoli from Villanova";
description "Lookup the next SEPTA train going your way";
name "SEPTA";
source "SEPTA";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SEPTA.pm";
topics "everyday";
category "time_sensitive";
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'duckduckgo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'],
            github => ['https://github.com/mattr555', 'mattr555'],
            twitter => ['https://twitter.com/mattr555', 'mattr555'];

spice to => 'http://www3.septa.org/hackathon/NextToArrive/$1/$2/5/';
spice from => '(.*)/(.*)';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers any => "next train", "train times", "train schedule", "septa";

my @stops = share('stops.txt')->slurp;

#remove \r and \n from the lines that were slurped in
sub trim_crlf($) {
    my $string = shift;
    $string =~ s/[\x0A\x0D]//g;
    return $string;
}

@stops = map { trim_crlf($_) } @stops;

#find a stop from a partial name (e.g. converts "30th street" -> "30th Street Station")
#names sourced from GTFS at njt-api.appspot.com/septa/stops
sub normalize_stop {
    my @matches = ();  #list of stop matches
    foreach my $stop (@stops){
        return $stop if (lc $_[0]) eq (lc $stop);  #if they're exactly equal, return the stop
        push(@matches, $stop) if index(lc $stop, lc $_[0]) > -1;  #if the stop name contains the input, add it to matches
    }
    return $matches[0] if scalar(@matches) == 1;  #if we have one match, return it
    return;  #if we have no matches or too many, then we don't know the stop :(
}

handle remainder => sub {
    return unless /(?:from |to )?(.+) (to|from) (.+)/;
    my $curr = normalize_stop($1);
    my $tofrom = $2;
    my $dest = normalize_stop($3);
    
    if ($curr && $dest) {
        #put the stops in the right order (for queries like "septa paoli from strafford")
        return ($tofrom eq 'to' ? ($curr, $dest) : ($dest, $curr));
    }
    return;
};

1;
