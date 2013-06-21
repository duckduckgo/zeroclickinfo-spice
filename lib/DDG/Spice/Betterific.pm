package DDG::Spice::Betterific;

use DDG::Spice;

name "betterific";
description "Search Betterific for smart, innovative ideas to improve products and services.";
source "betterific";
primary_example_queries "betterific Arby's";
secondary_example_queries "betterif General Electric";
category "special";
# FIXME Are these the right categories?
topics "entertainment", "everyday", "special_interest";
# FIXME Point to the duckduckgo repository on pull.
code_url "https://github.com/bradcater/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Betterific.pm";
attribution github => ["https://github.com/bradcater", "Brad Cater"],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers startend => "betterif", "betterific";

spice to => 'http://betterific.com/api/search/tags?q=$1';
#FIXME Remove this before deploying.
#spice to => 'http://localhost:3000/api/search/tags?q=$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {

  # If the query isn't blank, then use it for the API query.
  return $_ if length($_) > 0;

	return '' if $_ eq '';
	return;
};

1;
