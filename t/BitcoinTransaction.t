#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinTransaction )],
    '9cad0da642d2c68b2cfb44564b5bcb74737a8406b84abb509e84667855493aed' => test_spice(
        '/js/spice/bitcoin_transaction/9cad0da642d2c68b2cfb44564b5bcb74737a8406b84abb509e84667855493aed',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f' => test_spice(
        '/js/spice/bitcoin_transaction/3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinTransaction',
        proxy_cache_valid => "418 1d", 
    ),
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1' => undef,
    '3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f something' => undef,
    'something 3a0e7ed03bb6d35b7e0108e1efa26a89ef9955a3945bc8f66c84d0d96f53bb1f' => undef
);

done_testing;

