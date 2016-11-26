#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cookbooks )],
    'mysql cookbook' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    'cookbook mysql' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    'chef install mysql' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    'chef mysql' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
);

done_testing;
