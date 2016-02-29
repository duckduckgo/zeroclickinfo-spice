package DDG::Spice::SeatGeek::EventsByArtist;
# ABSTRACT: Returns upcoming concerts for a band/artist.

use strict;
use DDG::Spice;
use Text::Trim;

triggers startend =>
    'upcoming concert',
    'upcoming concerts',
    'concert',
    'concerts',
    'live',
    'live show',
    'live shows',
    'gigs',
    'tickets',
    'event',
    'events';

spice proxy_cache_valid => "200 304 12h";

spice to => 'https://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&performers.slug=$1&callback={{callback}}';

handle remainder_lc => sub {
    # in case we've matched for example "upcoming bjork concerts"
    $_ =~ s/^upcoming\s//;

    # If query starts with any of these assume it's one of the other queries
    return if ($_ =~ /^(in |at |near me|nearby)/);

    # Removes spaces from the beginning and end of the query
    $_ = trim($_);

    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
