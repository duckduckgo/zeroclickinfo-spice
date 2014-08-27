package DDG::Spice::SEPTA;
# ABSTRACT: Show train schedules for the SEPTA Regional Rail network

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
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

spice to => 'http://www3.septa.org/hackathon/NextToArrive/$1/$2/5/';

spice wrap_jsonp_callback => 1;

triggers any => "next train", "train times", "train schedule", "septa";

spice from => '(.*)/(.*)';

spice proxy_cache_valid => "418 1d";

handle query_lc => sub {
    my (%stops) = ( #This is just a few aliases. Not all stops are listed here.
        "30th St" => "30th Street Station",
        "30th St." => "30th Street Station",
        "30th Street" => "30th Street Station",
        "49th St." => "49th St",
        "49th Street" => "49th St",
        "Allen Ln" => "Allen Lane",
        "Allen Ln." => "Allen Lane",
        "Chelten Ave" => "Chelten Avenue",
        "Chelten Ave." => "Chelten Avenue",
        "Chester" => "Chester TC",
        "Chester Transit Center" => "Chester TC",
        "Eastwick" => "Eastwick Station",
        "Elm St." => "Elm St",
        "Elm Street" => "Elm St",
        "Elwyn" => "Elwyn Station",
        "Fern Rock" => "Fern Rock TC",
        "Fern Rock Transit Center" => "Fern Rock TC",
        "Ft. Washington" => "Ft Washington",
        "Fort Washington" => "Ft Washington",
        "Highland Ave." => "Highland Ave",
        "Highland Avenue" => "Highland Ave",
        "Holmesburg" => "Holmesburg Jct",
        "Holmesburg Junction" => "Holmesburg Jct",
        "Jenkintown" => "Jenkintown-Wyncote",
        "Main St." => "Main St",
        "Main Street" => "Main St",
        "Market East Station" => "Market East",
        "Mt. Airy" => "Mt Airy",
        "Mount Airy" => "Mt Airy",
        "Norristown" => "Norristown TC",
        "Norristown Transit Center" => "Norristown TC",
        "North Broad St." => "North Broad St",
        "North Broad Street" => "North Broad St",
        "North Broad" => "North Broad St",
        "St Davids" => "St. Davids",
        "Saint Davids" => "St. Davids",
        "St Martins" => "St. Martins",
        "Saint Martins" => "St. Martins",
        "Suburban" => "Suburban Station",
        "Temple" => "Temple U",
        "Temple Univ" => "Temple U",
        "Temple Univ." => "Temple U",
        "Temple University" => "Temple U",
        "Drexel" => "University City",
        "Penn" => "University City",
        "Wayne Junction" => "Wayne Jct",
        "Wynnefield Ave." => "Wynnefield Avenue"
    );

    s/\s+septa|septa\s+//;
    /(?:next trains?|train times|train schedule)?(?: from| to)? (.+) (to|from) (.+)/;

    my $curr = join " ", map { ucfirst } split /\s+/, $1;
    my $dest = join " ", map { ucfirst } split /\s+/, $3;

    if (exists $stops{$curr}) {
        $curr = $stops{$curr};
    }
    if (exists $stops{$dest}) {
        $dest = $stops{$dest};
    }

    return ($2 eq 'to' ? ($curr, $dest) : ($dest, $curr));
};

1;
