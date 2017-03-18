#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Dockerhub)],

    'docker redis' => test_spice(
        '/js/spice/dockerhub/redis',
        call_type => 'include',
        caller => 'DDG::Spice::Dockerhub'
    ),
    'wordpress dockerhub' => test_spice(
        '/js/spice/dockerhub/wordpress',
        call_type => 'include',
        caller => 'DDG::Spice::Dockerhub'
    ),
    'docker hub duckpan' => test_spice(
        '/js/spice/dockerhub/duckpan',
        call_type => 'include',
        caller => 'DDG::Spice::Dockerhub'
    )
    
);

done_testing;

