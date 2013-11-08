package DDG::Spice::Songkick::Getartistid;

use strict;
use warnings;
use DDG::Spice;

name "Songkick Artists";
description "Find similar artists.";
source "Songkick";
primary_example_queries "artists like Fleetwood Mac";
secondary_example_queries "artists similar to Eric Clapton";
category "entertainment";
topics "entertainment", "everyday", "music";
# FIXME Point to the duckduckgo repository on pull.
code_url "https://github.com/bradcater/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Songkick/Artists.pm";
attribution github => ["https://github.com/bradcater", "Brad Cater"],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers startend => "artists";

spice to => 'http://api.songkick.com/api/3.0/search/artists.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=1&query=$1&jsoncallback={{callback}}';

handle remainder => sub {
  # If the query isn't blank, then use it for the API query.
  if (length($_) > 0) {
    if ($_ =~ /^like (.+)$/) {
      return $1;
    } elsif ($_ =~ /^similar to (.+)$/) {
      return $1;
    } else {
      return $_;
    }
  }
	return;
};

1;
