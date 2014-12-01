package DDG::Spice::SeatGeek::Concerts;
# ABSTRACT: Returns upcoming concerts for a band/artist.

use DDG::Spice;

primary_example_queries "live show weezer", "upcoming concerts in flames";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Concerts";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers startend => 'upcoming concert', 'upcoming concerts', 'concert', 'concerts', 'live', 'live show', 'live shows';

spice to => 'http://api.seatgeek.com/2/events?performers.slug=$1&taxonomies.name=concert&callback={{callback}}';

handle remainder_lc => sub {
    # Removes triggers from the query
    $_ =~ s/^(:?(upcoming\s*)?(concerts?))|((live)\s*(:?(shows?))?)$//gi;
    # Removes spaces from the beginning of the query
    $_ =~ s/^\s+//;
    # Removes spaces from the end of the query
    $_ =~ s/\s+$//;
    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;