#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice proxy_cache_valid => "418 1d";

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    'time Amsterdam' => test_spice(
        '/js/spice/time/Amsterdam',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
    'time Netherlands' => test_spice(
        '/js/spice/time/Netherlands',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Birmingham' => test_spice(
        '/js/spice/time/Birmingham',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Birmingham, AL' => test_spice(
        '/js/spice/time/Birmingham%20AL',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time Canada' => test_spice(
        '/js/spice/time/Canada',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    )
);

done_testing;

