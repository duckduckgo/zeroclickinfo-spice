# Testing file to test Enervee Spice

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Enervee )],
    'L42B1180 TV query' => test_spice(
	'/js/spice/enervee/123906056',
	call_type => 'include',
	caller => 'DDG::Spice::Enervee'
    ),
);

done_testing;
