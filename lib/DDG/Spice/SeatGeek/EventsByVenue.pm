package DDG::Spice::SeatGeek::EventsByVenue;
# ABSTRACT: Returns upcoming concerts at a venue

use DDG::Spice;

primary_example_queries "live shows at cafe oto", "upcoming concerts at shea stadium";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Events By Venue";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/EventsByVenue.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'],
    github => ['https://github.com/andrey-p','Andrey Pissantchev'];

triggers start => 'upcoming concerts at',
    'concerts at',
    'live at',
    'live shows at',
    'shows at',
    'gigs at';

spice proxy_cache_valid => "200 304 12h";

spice to => 'http://api.seatgeek.com/2/events?taxonomies.name=concert&venue.slug=$1&callback={{callback}}';

handle remainder_lc => sub {
    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
