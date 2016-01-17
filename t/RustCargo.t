#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RustCargo )],
    'cargo package gcc' => test_spice(
        '/js/spice/rust_cargo/gcc',
        call_type => 'include',
        caller => 'DDG::Spice::RustCargo',
    ),
    'rust cargo time' => test_spice(
        '/js/spice/rust_cargo/time',
        call_type => 'include',
        caller => 'DDG::Spice::RustCargo',
    ),
    'rust packages log' => test_spice(
        '/js/spice/rust_cargo/log',
        call_type => 'include',
        caller => 'DDG::Spice::RustCargo',
    ),
    
    'cargo shipping' => undef,
    'rust treatment' => undef
);

done_testing;
