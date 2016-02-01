#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use URI::Encode;

my $uri = URI::Encode->new({encode_reserved => 0});

ddg_spice_test(
    [qw( DDG::Spice::ProductHunt )],
    # Good examples
    'producthunt duckduck' => test_spice(
        '/js/spice/product_hunt/duckduck',
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    'producthunt clock app' => test_spice(
        '/js/spice/product_hunt/' . $uri->encode('clock app'),
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    # Own-aliases searches
    'producthunt producthunt' => test_spice(
        '/js/spice/product_hunt/producthunt',
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    'producthunt product hunt' => test_spice(
        '/js/spice/product_hunt/' . $uri->encode('product hunt'),
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    'product hunt producthunt' => test_spice(
        '/js/spice/product_hunt/producthunt',
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    'product hunt product hunt' => test_spice(
        '/js/spice/product_hunt/' . $uri->encode('product hunt'),
        call_type => 'include',
        caller => 'DDG::Spice::ProductHunt'
    ),
    # Empty remainder
    'producthunt' => undef,
    'product hunt' => undef
);

done_testing;
