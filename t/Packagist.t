#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Packagist)],
    'packagist laravel' => test_spice(
        '/js/spice/packagist/laravel',
        call_type => 'include',
        caller => 'DDG::Spice::Packagist'
    ),
    'composer laravel' => test_spice(
        '/js/spice/packagist/laravel',
        call_type => 'include',
        caller    => 'DDG::Spice::Packagist',
    ),
    'composer install laravel' => test_spice(
        '/js/spice/packagist/laravel',
        call_type => 'include',
        caller    => 'DDG::Spice::Packagist',
    ),
    'packagist' => test_spice(
        '/js/spice/packagist/',
        call_type => 'include',
        caller    => 'DDG::Spice::Packagist',
    ),
);

done_testing;

