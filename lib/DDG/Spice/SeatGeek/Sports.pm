package DDG::Spice::SeatGeek::Sports;
# ABSTRACT: Returns upcoming sport events for a given team/performer.

use DDG::Spice;

primary_example_queries "UEFA Champions League events", "Atletico Madrid upcoming matches";
description "Upcoming sport events from SeatGeek";
name "SeatGeek Sports";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/Sports.pm";
category "entertainment";
topics "entertainment";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers startend => 'upcoming matches', 'events', 'event', 'upcoming match', 'matches', 'sports', 'schedule', 'tickets', 'games';

spice to => 'http://api.seatgeek.com/2/events?q=$1&taxonomies.name=sports&per_page=50&callback={{callback}}';

handle remainder_lc => sub {
    # Removes spaces from the beginning of the query
    $_ =~ s/^\s+//;
    # Removes spaces from the end of the query
    $_ =~ s/\s+$//;
    return $_ if $_;
    return;
};

1