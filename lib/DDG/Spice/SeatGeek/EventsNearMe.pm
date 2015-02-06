package DDG::Spice::SeatGeek::EventsNearMe;
# ABSTRACT: Returns upcoming concerts based on geolocation

use DDG::Spice;

primary_example_queries "live shows near me", "upcoming concerts in my area";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Events By Geolocation";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/EventsNearMe.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'],
    github => ['https://github.com/andrey-p','Andrey Pissantchev'];

triggers start => 
    'upcoming concert',
    'upcoming concerts',
    'concerts',
    'live',
    'live shows',
    'shows',
    'gigs';

spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

spice to => 'http://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&lat=$1&lon=$2&range=50mi&&callback={{callback}}';
spice from => '([\-0-9.]+)/([\-0-9.]+)';

handle remainder_lc => sub {
    # regex guard - remainder should always have "in my area" or "near me"
    return if $_ !~ /(in my area|near me)$/;

    # only make request if geolocation data's available
    if ($loc && $loc->latitude && $loc->longitude) {
        return $loc->latitude, $loc->longitude;
    }

    return;
};

1;
