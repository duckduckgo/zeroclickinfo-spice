package DDG::Spice::JsKeycodes;
# ABSTRACT: Get the Javascript keycode of a key

use DDG::Spice;
use Text::Trim;

use Data::Dumper;

spice is_cached => 1;

# Metadata
name "Javascript Keycodes";
source "";
description "Get the Javascript keycode for a key";
primary_example_queries "keycode j", "javascript keycode tab";
secondary_example_queries "javascript keycodes";

category "reference";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/JsKeycodes.pm";
attribution github => ["https://github.com/andrey-p/", "Andrey Pissantchev"];

# Triggers
triggers any => "keycode",
    "keycodes";

spice call_type => 'self';

my %keys = map { $_ => undef } (
    'backspace',
    'tab',
    'enter',
    'shift',
    'ctrl',
    'alt',
    'pause',
    'break',
    'caps lock',
    'escape',
    'page up',
    'page down',
    'end',
    'home',
    'left arrow',
    'up arrow',
    'right arrow',
    'down arrow',
    'insert',
    'delete',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'space',
    'numpad 0',
    'numpad 1',
    'numpad 3',
    'numpad 4',
    'numpad 5',
    'numpad 6',
    'numpad 7',
    'numpad 8',
    'numpad 9',
    '*',
    '-',
    '.',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'f10',
    'f11',
    'f12',
    'num lock',
    'scroll lock',
    ';',
    ,
    ',',
    '/',
    '\\',
    '(',
    ')',
    'quote'
);

my $is_valid_key;

# Handle statement
handle remainder_lc => sub {
    # display only if query contains "javascript" or "js"
    # or the remainder is a valid key
    # to avoid conflict with any other uses of the word "keycode"
    return unless $_ =~ s/js|javascript//i or exists $keys{$_};

    return call;
};

1;
