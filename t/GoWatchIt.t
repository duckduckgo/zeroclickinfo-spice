#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use URI::Encode;

my $uri = URI::Encode->new({encode_reserved => 0});

ddg_spice_test(
    [
        'DDG::Spice::GoWatchIt'
    ],
    'watch world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'watch modern family' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('modern family'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'stream world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'watch online world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'world war z watch online' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'world war z stream online' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'stream online world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'buy movie world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'rent movie world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'movie world war z' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'world war z movie' => test_spice(
        '/js/spice/go_watch_it/' . $uri->encode('world war z'),
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'apple watch' => undef,
    # but match watch apple
    'watch apple' => test_spice(
        '/js/spice/go_watch_it/apple',
        call_type => 'include',
        caller => 'DDG::Spice::GoWatchIt'
    ),

    'pocket watch' => undef,
    'watch tower' => undef
);

done_testing;
