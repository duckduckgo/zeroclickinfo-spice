#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ExpandURL )],
    'http://bit.ly/a' => test_spice(
        '/js/spice/expand_url/bit.ly%2Fa',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'http://bit.ly/aBc' => test_spice(
        '/js/spice/expand_url/bit.ly%2FaBc',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'expand bit.ly/lolcatz' => test_spice(
        '/js/spice/expand_url/bit.ly%2Flolcatz',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'https://4sq.com/foo' => test_spice(
        '/js/spice/expand_url/4sq.com%2Ffoo',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'expand ddg.gg' => test_spice(
        '/js/spice/expand_url/ddg.gg',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'expand http://t.co/abc123' => test_spice(
        '/js/spice/expand_url/t.co%2Fabc123',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'untiny http://t.co/3BjGmvnowY' => test_spice(
        '/js/spice/expand_url/t.co%2F3BjGmvnowY',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
    'expand air' => undef,
    'untiny http' => undef,
    'http' => undef,
    'https' => undef
);

done_testing;
