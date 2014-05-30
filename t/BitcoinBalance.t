#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinBalance )],
    '17x23dNjXJLzGMev6R63uyRhMWP1VHawKc' => test_spice(
        '/js/spice/bitcoin_balance/17x23dNjXJLzGMev6R63uyRhMWP1VHawKc',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBalance',
        proxy_cache_valid => "418 1d", 
    ),
);

done_testing;