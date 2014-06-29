#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinBlock )],
    '00000000000000000090647a08a11a61c15d1cc6e0b33777a30125abda1de33c' => test_spice(
        '/js/spice/bitcoin_block/00000000000000000090647a08a11a61c15d1cc6e0b33777a30125abda1de33c',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBlock',
    ),
    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => test_spice(
        '/js/spice/bitcoin_block/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBlock',
    ),
    '00000009839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => undef,
    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048 something' => undef,
    'something 00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => undef
);

done_testing;