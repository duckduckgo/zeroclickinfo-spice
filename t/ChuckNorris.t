#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ChuckNorris )],
    'chuck norris facts' => test_spice(
        '/js/spice/chuck_norris/',
        call_type => 'include',
        caller => 'DDG::Spice::ChuckNorris',
        is_unsafe => 1
    ),
    'chuck norris jokes' => test_spice(
        '/js/spice/chuck_norris/',
        call_type => 'include',
        caller => 'DDG::Spice::ChuckNorris',
        is_unsafe => 1
    ),
);

done_testing;

