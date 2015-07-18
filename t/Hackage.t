#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
ddg_spice_test(
    [qw( DDG::Spice::Hackage )],
    'haskell json' => test_spice(
        '/js/spice/hackage/json',
        call_type => 'include',
        caller => 'DDG::Spice::Hackage'
    ),
    'json haskell' => test_spice(
         '/js/spice/hackage/json',
         call_type => 'include',
         caller => 'DDG::Spice::Hackage'
    )
);

done_testing;
