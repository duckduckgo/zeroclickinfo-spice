#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Crunchbase::Collections)],
    # primary_example_query
    'crunchbase duckduckgo' => test_spice(
        '/js/spice/crunchbase/collections/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Crunchbase::Collections'
    ),
    # failed query
    'crunchbase yellowbrickroad' => => test_spice(
        '/js/spice/crunchbase/collections/yellowbrickroad',
        call_type => 'include',
        caller => 'DDG::Spice::Crunchbase::Collections'
    ),
);

done_testing;

