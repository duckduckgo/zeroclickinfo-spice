#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice proxy_cache_valid => "418 1d";

my @kingston_town = (
    '/js/spice/time/kingston%20jamaica',
    call_type => 'include',
    caller    => 'DDG::Spice::Time'
);

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    # Primary examples
    'time in Melbourne' => test_spice(
        '/js/spice/time/melbourne',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    'time for Australia' => test_spice(
        '/js/spice/time/canberra%20australia',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    # Secondary examples
    'what time is it in Melbourne' => test_spice(
        '/js/spice/time/melbourne',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    'what is the time in Birmingham' => test_spice(
        '/js/spice/time/birmingham',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    # Additional queries
    'time in Canada' => test_spice(
        '/js/spice/time/ottawa%20canada',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    'time in London' => test_spice(
        '/js/spice/time/london%20united%20kingdom',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    'time at the Vatican' => test_spice(
        '/js/spice/time/the%20vatican',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    # Different form, same result.
    'time in kingston'                         => test_spice(@kingston_town),
    'current time in kingston'                 => test_spice(@kingston_town),
    'local time in kingston'                   => test_spice(@kingston_town),
    'current local time in kingston'           => test_spice(@kingston_town),
    'what is the time in kingston'             => test_spice(@kingston_town),
    'what time is it in kingston?'             => test_spice(@kingston_town),
    'what\'s the time in kingston'             => test_spice(@kingston_town),
    'whats the current local time in kingston' => test_spice(@kingston_town),
    'local time for kingston'                  => test_spice(@kingston_town),
    'local time of kingston'                   => test_spice(@kingston_town),
    # Intentionally ignored
    'curent time in kingston'  => undef,
    'current local time'       => undef,
    'time and space museum'    => undef,
    'time complexity of qsort' => undef,
    'running time of titanic'  => undef,
);

done_testing;

