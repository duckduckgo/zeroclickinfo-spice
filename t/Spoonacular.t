#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Spoonacular'
    ],
    'chicken burger' => test_spice(
        '/js/spice/spoonacular/chicken%20burger',
        call_type => 'include',
        caller => 'DDG::Spice::Spoonacular',
    ),
    'cheap recipes' => test_spice(
        '/js/spice/spoonacular/cheap%20recipes',
        call_type => 'include',
        caller => 'DDG::Spice::Spoonacular',
    ),
    'popular pancakes' => test_spice(
        '/js/spice/spoonacular/popular%20pancakes',
        call_type => 'include',
        caller => 'DDG::Spice::Spoonacular',
    ),
);

# intentionally failing tests, these queries must NOT trigger the plugin

my @q = (
  "car dealer",
  "restaurants in new york",
  "delicious",  
);

ddg_spice_test(
  [qw(DDG::Spice::Spoonacular)],
  map {
    $_ => undef
  } @q,
);

done_testing;
