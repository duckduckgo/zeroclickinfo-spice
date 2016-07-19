#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Untappd )],
    'untappd bommen' => test_spice(
        '/js/spice/untappd/bommen',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'untappd af brew' => test_spice(
        '/js/spice/untappd/af%20brew',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'untappd la luna rossa' => test_spice(
        '/js/spice/untappd/la%20luna%20rossa',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'all day ipa' => test_spice(
        '/js/spice/untappd/all%20day%20ipa',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'flora plum saison' => test_spice(
        '/js/spice/untappd/flora%20plum%20saison',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'tratata uuntappdd untappd untappdd' => test_spice(
        '/js/spice/untappd/tratata%20uuntappdd%20untappdd',
        call_type => 'include',
        caller => 'DDG::Spice::Untappd',
    ),
    'untappd' => undef,
    'barleywine' => undef,
    'ipa' => undef,
    'bad query' => undef
);

done_testing;

