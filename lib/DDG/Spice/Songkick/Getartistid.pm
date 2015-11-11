package DDG::Spice::Songkick::Getartistid;
# ABSTRACT: Get similar artists for an artist

use strict;
use warnings;
use DDG::Spice;

triggers start => "artists", "bands", "musicians";

spice to => 'http://api.songkick.com/api/3.0/search/artists.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=1&query=$1&jsoncallback={{callback}}';

handle remainder => sub {
    # If the query isn't blank, then use it for the API query.
    if (length($_) > 0) {
        if ($_ =~ /^like (.+)$/) {
          return $1;
        } elsif ($_ =~ /^similar to (.+)$/) {
          return $1;
        }
    }
    return;
};

1;
