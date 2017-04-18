#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::UntinyURL )],
    'http://bit.ly/a' => test_spice(
        '/js/spice/untiny_url/bit.ly%2Fa',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'http://bit.ly/aBc' => test_spice(
        '/js/spice/untiny_url/bit.ly%2FaBc',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'expand bit.ly/lolcatz' => test_spice(
        '/js/spice/untiny_url/bit.ly%2Flolcatz',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'https://4sq.com/foo' => test_spice(
        '/js/spice/untiny_url/4sq.com%2Ffoo',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'expand ddg.gg' => test_spice(
        '/js/spice/untiny_url/ddg.gg',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'expand http://t.co/abc123' => test_spice(
        '/js/spice/untiny_url/t.co%2Fabc123',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'untiny http://t.co/3BjGmvnowY' => test_spice(
        '/js/spice/untiny_url/t.co%2F3BjGmvnowY',
        call_type => 'include',
        caller => 'DDG::Spice::UntinyURL'
    ),
    'expand air' => undef,
    'untiny http' => undef,
    'http' => undef,
    'https' => undef
);

done_testing;