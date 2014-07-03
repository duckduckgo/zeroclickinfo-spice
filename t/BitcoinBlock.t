#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinBlock )],
    '000000000000000000935d5053d80266447a6cc180e488bbb85675ca61cddfe7' => test_spice(
        '/js/spice/bitcoin_block/000000000000000000935d5053d80266447a6cc180e488bbb85675ca61cddfe7',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBlock',
    ),
    '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' => test_spice(
        '/js/spice/bitcoin_block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBlock',
    ),
    '000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20' => test_spice(
        '/js/spice/bitcoin_block/000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinBlock',
    ),
    '00000009839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => undef,
    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048 something' => undef,
    'something 00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048' => undef
);

done_testing;