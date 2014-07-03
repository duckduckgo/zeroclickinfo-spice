#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinAddress )],
    '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' => test_spice(
        '/js/spice/bitcoin_address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinAddress',
        proxy_cache_valid => "418 1d", 
    ),
    '1Biteasym3p5E4soZq8So6NjkjYugEnz2X' => test_spice(
        '/js/spice/bitcoin_address/1Biteasym3p5E4soZq8So6NjkjYugEnz2X',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinAddress',
        proxy_cache_valid => "418 1d", 
    ),
    '1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi' => test_spice(
        '/js/spice/bitcoin_address/1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi',
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