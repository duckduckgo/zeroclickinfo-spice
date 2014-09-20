package DDG::Spice::SeatGeek;
# ABSTRACT: Returns upcoming concerts for a band/artist.

use DDG::Spice;

primary_example_queries "live show weezer", "upcoming concerts in flames";
description "Upcoming concerts from SeatGeek";
name "SeatGeek";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers startend => 'upcoming concert', 'upcoming concerts', 'concert', 'concerts', 'live', 'live show', 'live shows';

spice to => 'http://api.seatgeek.com/2/events?performers.slug=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Removes triggers from the query
    $_ =~ s/^(:?(upcoming\s*)?(concerts?))|((live)\s*(:?(shows?))?)$//gi;
    # Converts the query to lowercase
    $_ =~ tr/[A-Z]/[a-z]/;
    # Removes spaces from the beginning of the query
    $_ =~ s/^\s+//;
    # Removes spaces from the end of the query
    $_ =~ s/\s+$//;
    # Replaces spaces between words with dashes
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;