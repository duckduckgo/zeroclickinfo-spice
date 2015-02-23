package DDG::Spice::SeatGeek::EventsByArtist;
# ABSTRACT: Returns upcoming concerts for a band/artist.

use strict;
use DDG::Spice;
use Text::Trim;

primary_example_queries "live show weezer", "upcoming concerts bjork";
description "Upcoming concerts from SeatGeek";
name "SeatGeek Events By Artist";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SeatGeek/EventsByArtist.pm";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'],
    github => ['https://github.com/andrey-p','Andrey Pissantchev'];

triggers startend => 
    'upcoming concert',
    'upcoming concerts',
    'concert',
    'concerts',
    'live',
    'live show',
    'live shows',
    'gigs';

spice proxy_cache_valid => "200 304 12h";

spice to => 'http://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&performers.slug=$1&callback={{callback}}';

handle remainder_lc => sub {  
    # in case we've matched for example "upcoming bjork concerts"
    $_ =~ s/^upcoming\s//;
    
    # If query starts with any of these assume it's one of the other queries
    return if ($_ =~ /^(in |at |near me)/);

    # Removes spaces from the beginning and end of the query
    $_ = trim($_);

    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
