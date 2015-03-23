package DDG::Spice::JsKeycodes;
# ABSTRACT: Get the Javascript keycode of a key

use DDG::Spice;
use Text::Trim;

spice is_cached => 1;

# Metadata
name "Javascript Keycodes";
source "MDN";
description "Get the Javascript keycode for a key";
primary_example_queries "keycode j", "javascript keycode tab";
secondary_example_queries "javascript keycodes";

category "reference";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/JsKeycodes.pm";
attribution github => ["https://github.com/andrey-p/", "Andrey Pissantchev"];

# Triggers
triggers any => "js keycode",
    "javascript keycode",
    "js keycodes",
    "javascript keycodes",
    "js key code",
    "javascript key code",
    "js key codes",
    "javascript key codes";


spice call_type => 'self';

# Handle statement
handle remainder_lc => sub {
    return call;
};

1;
