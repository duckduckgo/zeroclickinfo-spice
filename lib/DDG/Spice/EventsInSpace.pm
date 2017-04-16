package DDG::Spice::EventsInSpace;
# ABSTRACT: Shows upcoming events in space, both natural and human

use DDG::Spice;

name "Events in Space";
source "NASA JPL Space Calendar";
description "Upcoming events in space, both natural and human";
primary_example_queries "space events", "upcoming launches";
category "facts";
topics "science", "geek", "trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/EventsInSpace.pm";
attribution github  => ["elebow", "Eddie Lebow"];

triggers any => "space events",
"space calendar",
"launch calendar",
"space launch calendar",
"upcoming launches",
"upcoming space launches",
"launch schedule",
"nasa schedule",
"nasa calendar",
"nasa events",
"esa schedule",
"esa calendar",
"esa events";

spice to => "http://www2.jpl.nasa.gov/calendar/index.html";
spice wrap_string_callback => 1;

handle remainder => sub {
    return "" if $_ eq "";
    return;
};

1;
