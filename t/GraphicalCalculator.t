#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

# for exhaustive function testing, see list at http://mathjs.org/docs/reference/functions/alphabetical.html

my @shouldPassQ = (
    "x",
    "(x)",                      # legal proximal chars
    " x +X ",                   # lowercase
    "y = x",                    # strip y = 
    "f(x) = x",                 # strip f(x) = 
    "plot x plot",
    "gRaPh X grapH PLOT",       # strip explicit 'graph' and 'plot' directives
    "2x",                       # implicit multiplication
    "x^2",                      # pow(x,2)
    "x%3",                      # modulus
    "4 * sin(x) + 5 * cos(x/2)",# transcendental
    "1/x",                      # singluarity
    "f(x) = tan(x)",            # multiple singularities
    "sin(x) + 100",             # center graph on translated x=0 outside of default [-5,5] range
    "abs(x)",
    "exp(x)",
    "log(x)",
    "sqrt(x)",
    "pow(x,2)",                 # alternative to x^2
    "abs( exp(2x) * sqrt(x^3) / log(x) )",
    "= a = 4; x + a",           # compound statement w/ semantically distinct '='
    "men = 42; X-men",          # valid "plot" of X-men
    "x < 0 ? sin(x) : cos(x)"   # conditionals
);

my @shouldFailToTriggerQ = (
    "some text with embeddedx",
    "= 1 + 2"   # reserve this to trigger non-graphical calculator
);

my @shouldTriggerButFailToParseQ = (
    "some text with free x",
    "2x with arbitrary strings",
    "foo(x)"
);

# note: these work using a simple math.eval() at http://mathjs.org/examples/browser/plot.html,
# but do not work on a local install (independent of DDG). Need to contact the author.
my @shouldPassButWillFailQ = (
    "x!",       # does not recognize factorial
    "x^2 - 2",  # parses as x^(2-2) because of Javascript precedence on ^ as a bitwise operator
    "x^2 - x",  # parses as x^(2-x)
    "pow(x,0.5)",   # as of 1.3.0, does not recognize non-integer powers
    "x^0.5",,   # fails because of both parsing on '^' and non-integer power
    "x^x",      # fails online also
    "x * pi",   # fails to parse 'pi' as the constant 'pi'
    "x + e",    # fails to parse 'e' as the constant 'e'
    "x + exp(e)",
    "gamma(x)", # not recognized; incorrect interval sampling and smoothing online
    "cube(2x)", # a math.js function not recognized by function-plot
    "ln(x)"     # does not recognize ln(); uses log(x,b) as base b, with shorthand log(x) as base 'e' and log10(x) as base 10
);

 
ddg_spice_test(

    # module to test
    [qw( DDG::Spice::GraphicalCalculator)],

    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    #'example query' => test_spice(
    #    '/js/spice/graphical_calculator/query',
    #    call_type => 'include',
    #    caller => 'DDG::Spice::GraphicalCalculator'
    #),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    #'bad example query' => undef,

    map {
        $_ => test_spice(

            # not correct?: either all pass or all fail
            # urlEncode $_ ?

            #'/js/spice/graphical_calculator/?q=' . $_ . '&ia=graphicalcalculator',    # always fails
            '/js/spice/graphical_calculator/',             # always passes
            call_type => 'self',
            caller => 'DDG::Spice::GraphicalCalculator'
        ) } ( @shouldPassQ, @shouldTriggerButFailToParseQ, @shouldPassButWillFailQ )
);
 
done_testing;

