#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice proxy_cache_valid => "418 1d";

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    'time Amsterdam' => test_spice(
        '/js/spice/time/amsterdam',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
    'time Netherlands' => test_spice(
        '/js/spice/time/netherlands',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Birmingham' => test_spice(
        '/js/spice/time/birmingham',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Birmingham, AL' => test_spice(
        '/js/spice/time/birmingham%20al',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Canada' => test_spice(
        '/js/spice/time/canada',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    )
);

done_testing;

