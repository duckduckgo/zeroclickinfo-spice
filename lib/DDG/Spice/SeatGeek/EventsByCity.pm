package DDG::Spice::SeatGeek::EventsByCity;
# ABSTRACT: Returns upcoming concerts in a city

use DDG::Spice;

primary_example_queries "live shows in london", "upcoming concerts in brisbane";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Events By City";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/EventsByCity.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers start => 'upcoming concerts in',
    'concerts in',
    'live in',
    'live shows in',
    'shows in';

spice to => 'http://api.seatgeek.com/2/events?venue.city=$1';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
