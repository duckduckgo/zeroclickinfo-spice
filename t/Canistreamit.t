#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Canistreamit )],
    'stream the wire' => test_spice(
        '/js/spice/canistreamit/the%20wire',
        call_type => 'include',
        caller => 'DDG::Spice::Canistreamit'
    ),
    'Can I stream The Dark Knight' => test_spice(
        '/js/spice/canistreamit/The%20Dark%20Knight',
        caller    => 'DDG::Spice::Canistreamit',
    ),
    'watch pirates of the caribbean' => test_spice(
        '/js/spice/canistreamit/pirates%20of%20the%20caribbean',
        caller    => 'DDG::Spice::Canistreamit',
    ),
);

done_testing;

