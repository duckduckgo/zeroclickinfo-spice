package DDG::Spice::Meetup;
# ABSTRACT: This Spice was inspired by an anonymous suggestion in the Instant Answers Forum
# # # # # # source: https://duck.co/ideas/idea/1126/already-an-instant-answers-for-meetup
# # # # # # When a user searches for "meetup + city name" they should receive
# # # # # # instant answers of suggested meetups in that city sorted by the number of
# # # # # # members in the group.

use DDG::Spice;
use YAML::XS 'LoadFile';
use Text::Trim;

spice is_cached => 1;

name "Meetup";
source "Meetup";
icon_url "https://icons.duckduckgo.com/ip2/www.meetup.com.ico";
description "Show meetups for a given city";
primary_example_queries "meetups in philadelphia";
secondary_example_queries "meetup groups near me";
category "random";
topics "social", "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Meetup.pm";
attribution github => ["alohaas", "Olivia Haas"],
            twitter => "livhaas";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'https://api.meetup.com/2/groups?&key={{ENV{DDG_SPICE_MEETUP_APIKEY}}}&country=$2&city=$1&state=$3&radius=50.0&page=20&order=members&callback={{callback}}';
triggers any => "meetup", "meetup.com", "meetups", "meetup groups";

my $states = LoadFile(share('states.yml'));

handle remainder => sub {
  # we only want place-based queries
  if (s/.*\b(for|about)\b\s*(.*)//i) {
    return;
  }

  # remove any words that might have been added
  s/.*\b(in|near|for|at|by|around|me|nearby|close)\b\s*(.*)/$2/i;

  trim();

  # If we can't get the location, don't bother
  return unless $loc && ($loc->city || $loc->region_name) && $loc->country_name;

  # the meetup API prefers abbreviations
  # grab the region abbrevation from the yml file
  my $state = $states->{$loc->region_name};

  # if there is no query or city specified, use the nearest loc
  if (!$_){
    return $loc->city, $loc->country_code, $state, {is_cached => 0};
  }
  # otherwise we have the full city, country, state query
  return $_, $loc->country_code, $state, {is_cached => 0};

  # we do not have the location to build a query
  return;

};

1;
