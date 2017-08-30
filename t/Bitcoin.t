#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin)],
    
    # Bitcoin Address
    '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' => test_spice(
        '/js/spice/bitcoin/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    '1Biteasym3p5E4soZq8So6NjkjYugEnz2X' => test_spice(
        '/js/spice/bitcoin/address/1Biteasym3p5E4soZq8So6NjkjYugEnz2X',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    '1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi' => test_spice(
        '/js/spice/bitcoin/address/1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    'bitcoin address 1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi' => test_spice(
        '/js/spice/bitcoin/address/1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    'btc address 1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi' => test_spice(
        '/js/spice/bitcoin/address/1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    'mBiteasym3p5E4soZq8So6NjkjYugEnz2X' => undef,
    'aBiteasym3p5E4soZq8So6NjkjYugEnz2X' => undef,
    '1Biteasym3p5E4soZq8So6NjkjYugEnz2X something' => undef,
    'something 1Biteasym3p5E4soZq8So6NjkjYugEnz2X' => undef,
    
    
    # Bitcoin Transactions
    '0e40627940d835d7154dcce33d6755f7ec40c7cc9e88d86291a971567bcd7ea7' => test_spice(
        '/js/spice/bitcoin/tx/0e40627940d835d7154dcce33d6755f7ec40c7cc9e88d86291a971567bcd7ea7',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    'b1956e97661f91ab020f97dff96b8043602dcbdc23d0825f790b521221bef1f5' => test_spice(
        '/js/spice/bitcoin/tx/b1956e97661f91ab020f97dff96b8043602dcbdc23d0825f790b521221bef1f5',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    'b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin/tx/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    'bitcoin transaction b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin/tx/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    'btc transaction b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin/tx/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        proxy_cache_valid => "418 1d",
    ),
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1' => undef,
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f something' => undef,
    'something 3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f' => undef,
    
    
    # Bitcoin Blocks
    '000000000000000000935d5053d80266447a6cc180e488bbb85675ca61cddfe7' => test_spice(
        '/js/spice/bitcoin/block/000000000000000000935d5053d80266447a6cc180e488bbb85675ca61cddfe7',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' => test_spice(
        '/js/spice/bitcoin/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    '000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20' => test_spice(
        '/js/spice/bitcoin/block/000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    'bitcoin block 000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20' => test_spice(
        '/js/spice/bitcoin/block/000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    'btc block 000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20' => test_spice(
        '/js/spice/bitcoin/block/000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
    ),
    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048 something' => undef,
    'something 00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => undef
    
);

done_testing;
