#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %q = (
  "new york apartments"               => "bbcthree/$today",
);

ddg_spice_test(
  [qw( DDG::Spice::Apartable::City)],
  map {
    $_ => test_spice( '/js/spice/apartable/city/'.$q{$_},
    caller => 'DDG::Spice::Apartable',
    is_cached => 0 )
  } keys %q,
);

done_testing;
