#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MarsPhotos)],
    'mars photos 2016-01-01' => test_spice(
        '/js/spice/mars_photos/curiosity/2016-01-01',
        call_type => 'include',
        caller => 'DDG::Spice::MarsPhotos',
    )
);

done_testing;
