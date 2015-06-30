#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
ddg_spice_test(
    [qw( DDG::Spice::Hackage )],
    'hask json' => test_spice(
        '/js/spice/hackage/json',
        call_type => 'include',
        caller => 'DDG::Spice::Hackage'
    ),
    'json hask' => test_spice(
         '/js/spice/hackage/json',
         call_type => 'include',
         caller => 'DDG::Spice::Hackage'
    )
);

done_testing;
