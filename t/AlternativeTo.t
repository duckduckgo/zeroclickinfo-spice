#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::AlternativeTo )],
    'alternative to windows' => test_spice(
        '/js/spice/alternative_to/windows/all/',
        call_type => 'include',
        caller => 'DDG::Spice::AlternativeTo'
    ),
    'alternative to notepad' => test_spice(
        '/js/spice/alternative_to/notepad/all/',
        caller    => 'DDG::Spice::AlternativeTo',
    ),
    'alternative to photoshop for mac' => test_spice(
        '/js/spice/alternative_to/adobe-photoshop/mac/',
        caller    => 'DDG::Spice::AlternativeTo',
    ),
    'free alternative to spotify for windows' => test_spice(
        '/js/spice/alternative_to/spotify/windows/free',
        caller    => 'DDG::Spice::AlternativeTo',
    ),
);

done_testing;

