#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinAddress )],
    '1Biteasym3p5E4soZq8So6NjkjYugEnz2X' => test_spice(
        '/js/spice/bitcoin_address/1Biteasym3p5E4soZq8So6NjkjYugEnz2X',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinAddress',
        proxy_cache_valid => "418 1d", 
    ),
    'mBiteasym3p5E4soZq8So6NjkjYugEnz2X' => undef,
    'aBiteasym3p5E4soZq8So6NjkjYugEnz2X' => undef,
    '1Biteasym3p5E4soZq8So6NjkjYugEnz2X something' => undef,
    'something 1Biteasym3p5E4soZq8So6NjkjYugEnz2X' => undef
);

done_testing;