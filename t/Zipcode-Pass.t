#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# PASSING TESTS
my %q = (
  # Without Country
  "19301"            => ["19301", "ZZ"],
  "zip 19301"        => ["19301", "ZZ"],
  "zipcode 19301"    => ["19301", "ZZ"],
  "zip code 19301"   => ["19301", "ZZ"],
  "postalcode 19301" => ["19301", "ZZ"],

  # With Country
  "L1M1L8 Canada"    => ["L1M1L8", "CA"],
  "L1M 1L8 Canada"   => ["L1M1L8", "CA"],
  "19087 USA"        => ["19087", "US"],
  "19087-123 USA"    => ["19087-123", "US"]
);

ddg_spice_test(
  [qw( DDG::Spice::Zipcode)],
  map {
    $_ => test_spice( '/js/spice/zipcode/'.$q{$_}[0].'/'.$q{$_}[1],
      caller => 'DDG::Spice::Zipcode'
    )
  } keys %q,
);

done_testing;