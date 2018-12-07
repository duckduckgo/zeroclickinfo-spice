#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Twitter )],
    '@duckduckgo' => test_spice(
        '/js/spice/twitter/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),

    'twitter yegg' => test_spice(
        '/js/spice/twitter/yegg',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),

    'twitter ecounysis' => test_spice(
        '/js/spice/twitter/ecounysis',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),
    
    'twitter account @duckduckgo' => test_spice(
        '/js/spice/twitter/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),
    
    '@duckduckgo on twitter' => test_spice(
        '/js/spice/twitter/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),
    
    '@nibnalin\'s twitter id' => test_spice(
        '/js/spice/twitter/nibnalin',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter',
    ),
    
    'what is twitter' => undef,
    'twitter analytics' => undef,
    'twitter company' => undef,
    'about twitter' => undef,
    'twitter apis' => undef,
    'twitter developers' => undef,
    'twitter users' => undef,
    'twitter search' => undef,
    'twitter app' => undef,
    'search twitter' => undef,
    '@random string' => undef,
    'account settings twitter' => undef,
    'twitter settings' => undef,
    'make account twitter' => undef
);

done_testing;