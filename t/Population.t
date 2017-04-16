#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Population)],

primary_example_queries "population of russia ", "population usa";

    'population of russia' => test_spice(
        '/js/spice/population/RUS/the%20Russian%20Federation',
        call_type => 'include',
        caller => 'DDG::Spice:Population'
    ),
    'population  usa' => test_spice(
        '/js/spice/population/USA/the%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice:Population'   
    ),
    'population of Canda' => test_spice(
        '/js/spice/population/CAN/Canada',
        call_type => 'include',
        caller => 'DDG::Spice::Population,'
    )
);

done_testing;
