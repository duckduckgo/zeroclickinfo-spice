#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Biblio)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
   'biblio casino royale by ian flemming' => test_spice(
        '/js/spice/biblio/casino%20royale%20by%20ian%20flemming',
        call_type => 'include',
        caller => 'DDG::Spice::Biblio'
    ),
    'biblio great gatsby' => test_spice(
        '/js/spice/biblio/great%20gatsby',
        call_type => 'include',
        caller => 'DDG::Spice::Biblio'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'casino royale by ian flemming' => undef,
    'great gatsby' => undef,
);

done_testing;

