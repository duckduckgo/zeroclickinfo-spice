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

my @phoenixville = (
    '/js/spice/time/phoenixville%20united%20states',
    call_type => 'include',
    caller    => 'DDG::Spice::Time'
);

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    # Primary examples
    'time for Australia' => test_spice(
        '/js/spice/time/canberra%20australia',
        call_type => 'include',
        caller    => 'DDG::Spice::Time'
    ),
    # Secondary examples
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

    'time'                                     => test_spice(@phoenixville),
    'current time'                             => test_spice(@phoenixville),
    'current local time'                       => test_spice(@phoenixville),
    # Intentionally ignored
    'time and space museum'    => undef,
    'time complexity of qsort' => undef,
    'running time of titanic'  => undef,
    'time in Toronto'          => undef, # This will still show a result in production, but the triggering is handled internally
);

done_testing;

