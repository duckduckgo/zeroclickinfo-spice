package DDG::Spice::SeatGeek;
# ABSTRACT: Shows upcoming concert for a musician/band/artist.

use DDG::Spice;

primary_example_queries "live show new york mets";
category "entertainment";
topics "entertainment", "music";
attribution github => ['https://github.com/MariagraziaAlastra','MariagraziaAlastra'];

triggers startend => 'upcoming concert', 'upcoming concerts', 'concert', 'concerts', 'live', 'live show', 'live shows';

spice to => 'http://api.seatgeek.com/2/events?performers.slug=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    $_ =~ s/^(:?(upcoming\s*)?(concerts?))|((live)\s*(:?(show)|(shows))?)$//gi;
    $_ = shift;
    $_ =~ s/^\s+//;
    $_ =~ s/\s+$//;
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;