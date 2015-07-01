#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Wikidata)],
    'population of Germany' => test_spice(
        '/js/spice/wikidata/germany/population',
        call_type => 'include',
        caller => 'DDG::Spice::Wikidata'
    ),
    'president of the United States' => test_spice(
        '/js/spice/wikidata/united%20states/president',
        call_type => 'include',
        caller => 'DDG::Spice::Wikidata'
    ),
    'who is the mayor of London' => test_spice(
        '/js/spice/wikidata/london/mayor',
        call_type => 'include',
        caller => 'DDG::Spice::Wikidata'
    ),
    'what are the sister cities of Berlin' => test_spice(
        '/js/spice/wikidata/berlin/sister%20cities',
        call_type => 'include',
        caller => 'DDG::Spice::Wikidata'
    ),
    'proffessor' => undef,
    'who is the mayor in London' => undef,
    'how is the wather in Germany' => undef
);

done_testing;

