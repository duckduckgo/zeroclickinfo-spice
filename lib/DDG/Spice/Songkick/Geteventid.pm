package DDG::Spice::Songkick::Geteventid;

use strict;
use warnings;
use DDG::Spice;

name "Songkick Events";
description "See upcoming concerts.";
source "Songkick";
primary_example_queries "concerts in Boston";
secondary_example_queries "Boston concerts";
category "entertainment";
topics "entertainment", "everyday", "music";
# FIXME Point to the duckduckgo repository on pull.
code_url "https://github.com/bradcater/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Songkick/Events.pm";
attribution github => ["https://github.com/bradcater", "Brad Cater"],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers startend => "concert", "concerts";

spice to => 'http://api.songkick.com/api/3.0/search/locations.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=1&query=$1&jsoncallback={{callback}}';

handle remainder => sub {
  # If the query isn't blank, then use it for the API query.
  if (length($_) > 0) {
    if ($_ =~ /^(around|in|near) (.+)$/) {
      return $2;
    } elsif ($_ =~ /^(.+) area$/) {
      return $1;
    } else {
      return $_;
    }
  }
	return;
};

1;
