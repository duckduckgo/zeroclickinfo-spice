package DDG::Spice::SeatGeek::EventsByArtist;
# ABSTRACT: Returns upcoming concerts for a band/artist.

use DDG::Spice;

primary_example_queries "live show weezer", "upcoming concerts bjork";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Events By Artist";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/EventsByArtist.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers startend => 'upcoming concert', 'upcoming concerts', 'concert', 'concerts', 'live', 'live show', 'live shows';

spice to => 'http://api.seatgeek.com/2/events?performers.slug=$1';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    # Removes triggers from the query
    $_ =~ s/^(:?(upcoming\s*)?(concerts?))|((live)\s*(:?(shows?))?)$//gi;

    # If query starts with any of these assume it's one of the other queries
    return if ($_ =~ /^(in |at |near me)/);

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
