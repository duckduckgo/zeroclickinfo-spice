#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinTransaction )],
    '0e40627940d835d7154dcce33d6755f7ec40c7cc9e88d86291a971567bcd7ea7' => test_spice(
        '/js/spice/bitcoin_transaction/0e40627940d835d7154dcce33d6755f7ec40c7cc9e88d86291a971567bcd7ea7',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    'b1956e97661f91ab020f97dff96b8043602dcbdc23d0825f790b521221bef1f5' => test_spice(
        '/js/spice/bitcoin_transaction/b1956e97661f91ab020f97dff96b8043602dcbdc23d0825f790b521221bef1f5',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    'b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin_transaction/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    'bitcoin transaction b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin_transaction/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    'btc transaction b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d' => test_spice(
        '/js/spice/bitcoin_transaction/b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1' => undef,
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f something' => undef,
    'something 3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f' => undef
);

done_testing;

