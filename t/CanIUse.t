#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

sub build_test {
    my ($query) = @_;
    return test_spice(
        '/js/spice/can_iuse/'.$query,
        call_type => 'include',
        caller => 'DDG::Spice::CanIUse'
    )
}

ddg_spice_test(
    [qw( DDG::Spice::CanIUse)],

    'css browser compatibility'   => build_test('css'),
    'html5 browser compatibility' => build_test('html5'),
    'css css3 browser compatibility' => build_test('css%20css3'),        
);

done_testing;

