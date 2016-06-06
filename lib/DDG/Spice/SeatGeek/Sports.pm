package DDG::Spice::SeatGeek::Sports;
# ABSTRACT: Returns upcoming sport events for a given team/performer.

use DDG::Spice;

triggers startend => 'upcoming matches', 'events', 'event', 'upcoming match', 'matches', 'sports', 'schedule', 'tickets', 'games';

spice to => 'https://api.seatgeek.com/2/events?q=$1&taxonomies.name=sports&per_page=50&callback={{callback}}';

handle remainder_lc => sub {
    # Removes spaces from the beginning of the query
    $_ =~ s/^\s+//;
    # Removes spaces from the end of the query
    $_ =~ s/\s+$//;
    return $_ if $_;
    return;
};

1
