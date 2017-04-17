package DDG::Spice::GraphicalCalculator;
# ABSTRACT: Graphical calculator for 2D equations

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Graphical Calculator";
source "";
# icon_url "";
description "Graph (plot) mathematical equations";
primary_example_queries "= x^2", "y = 4 * sin(x) + 5 * cos(x/2)";
secondary_example_queries "f(x) = tan(x)";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "calculations";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "math";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GraphicalCalculator.pm";
attribution github => ["https://github.com/maurizzzio/function-plot", "Mauricio Poppe"],
            github => ["https://github.com/devkmem", "devkmem"],
            web    => ["http://maurizzzio.github.io/function-plot/", "Function Plot"],
            web    => ["http://semanticoptions.com", "Damian Gessler"];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
#spice to => 'http://example.com/search/$1';
# Pure JS; https://duck.co/duckduckhack/spice_advanced_backend#pure-js-functions
spice call_type => 'self';  # see also 'handle' function below

# Triggers - https://duck.co/duckduckhack/spice_triggers
# trigger on:
#   1. y = ...
#   2. f(x) = ...
#   3. equation with variable x
#
# We do not trigger on ^= (input starting with "=") per se, because we need to coord that w/ the
# non-graphical calculator (e.g., = 1 + 1 should not trigger this IA, yet '= 2x' should trigger it).
# If the input has both an 'x' variable and starts with '=', we'll strip the leading '=' on the backend.
#
# trigger on a literal 'x' either as a character-token in-itself, or flanked by valid math.js operators;
# this list is not exhaustive, but it covers many common syntax cases. Secondary validation is done on the backend:
#
#    ^ beginning of line, | or
#       \s whitespace
#       + plus
#       - minus, unary negative
#       * multiply
#       / divide
#       ^ power (exponentiation)
#       % mod
#       ? : conditional
#       , parameter separator, (e.g., pow(x,x))
#       ; compound statement
#       0-9 numeral for implicit multiplcation (e.g., 2x == 2*x)
#    $ or end of line
#
#       ! factorial # not supported
#

my $regex = qr/(^\s*y\s*=)|(^\s*f\(x\)\s*=)|((^|[\s(+\-*\/^%?:,;0-9])x([\s)+\-*\/^%?:,;0-9]|$))/;
triggers query_lc => $regex;

my $handler = sub {  # cannot use 'remainder' with regex triggers
    
  return unless $_;    # short-circuit on no input

  return call;  # call graphical_calculator.js

};

# Handle statement
handle query_lc => $handler;

1;  # return True at EOF
