# Testing file to test Enervee Spice

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Enervee )],
    'WFW95HEXW query' => test_spice(
	'/js/spice/enervee/124701823',
	call_type => 'include',
	caller => 'DDG::Spice::Enervee'
    ),
);

done_testing;
