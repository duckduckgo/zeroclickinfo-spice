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
    '/js/spice/time/America%20New%20York/generic/Phoenixville%2C%20Pennsylvania',
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
    
    'local date of kingston'                   => test_spice(@kingston_town),
    'what\'s the date in kingston'             => test_spice(@kingston_town),
    'whats the current date in kingston'       => test_spice(@kingston_town),
    'what is the date in kingston'             => test_spice(@kingston_town),
    'date in kingston'                         => test_spice(@kingston_town),
    
    'local day of kingston'                   => test_spice(@kingston_town),
    'what\'s the day in kingston'             => test_spice(@kingston_town),
    'whats the current day in kingston'       => test_spice(@kingston_town),
    'what is the day in kingston'             => test_spice(@kingston_town),
    'day in kingston'                         => test_spice(@kingston_town),
    
    'local month of kingston'                   => test_spice(@kingston_town),
    'what\'s the month in kingston'             => test_spice(@kingston_town),
    'whats the current month in kingston'       => test_spice(@kingston_town),
    'what is the month in kingston'             => test_spice(@kingston_town),
    'month in kingston'                         => test_spice(@kingston_town),
    
    'local year of kingston'                   => test_spice(@kingston_town),
    'what\'s the year in kingston'             => test_spice(@kingston_town),
    'whats the current year in kingston'       => test_spice(@kingston_town),
    'what is the year in kingston'             => test_spice(@kingston_town),
    'year in kingston'                         => test_spice(@kingston_town),

    'time'                                     => test_spice(@phoenixville),
    'current time'                             => test_spice(@phoenixville),
    'current local time'                       => test_spice(@phoenixville),
    
    'date'                                     => test_spice(@phoenixville),
    'current date'                             => test_spice(@phoenixville),
    'current local date'                       => test_spice(@phoenixville),
    
    'day'                                     => test_spice(@phoenixville),
    'current day'                             => test_spice(@phoenixville),
    'current local day'                       => test_spice(@phoenixville),
    
    'month'                                     => test_spice(@phoenixville),
    'current month'                             => test_spice(@phoenixville),
    'current local month'                       => test_spice(@phoenixville),
    
    'year'                                     => test_spice(@phoenixville),
    'current year'                             => test_spice(@phoenixville),
    'current local year'                       => test_spice(@phoenixville),
    # Intentionally ignored
    'pdt time'                 => undef,
    'dptsd month'              => undef,
    'dptsd date'               => undef,
    'dptsd year'               => undef,
    'dodsfd day'               => undef,
    'testing time'             => undef,
    'testing month'            => undef,
    'testing year'             => undef,
    'testing day'              => undef,
    'testing date'             => undef,
    'foobar time'              => undef,
    'adhjasdhjkd hjkasdjasd ashjkas time'    => undef,
    'time and space museum'    => undef,
    'time complexity of qsort' => undef,
    'running time of titanic'  => undef,
    'time in Toronto'          => undef, # This will still show a result in production, but the triggering is handled internally
);

done_testing;

