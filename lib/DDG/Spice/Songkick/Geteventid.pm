package DDG::Spice::Songkick::Geteventid;
# ABSTRACT: Get concerts for an artist through Songkick

use strict;
use warnings;
use DDG::Spice;

triggers startend => "concert", "concerts";

spice to => 'http://api.songkick.com/api/3.0/search/locations.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=1&query=$1&jsoncallback={{callback}}';

handle remainder => sub {
    # If the query isn't blank, then use it for the API query.
    if (length($_) > 0) {
        if ($_ =~ /^(around|in|near) (.+)$/) {
            (my $loc = $2) =~ s/^the\sarea$//g;
            if (length($loc) > 0) {
                return $loc;
            }
        } else {
            return;
        }
    }

    my $location = join(", ", $loc->city, $loc->region_name, $loc->country_name);
    return $location;
};

1;
