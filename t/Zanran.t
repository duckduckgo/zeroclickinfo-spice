#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use_ok('DDG::Spice::Zanran');

spice call_type => 'include';
spice answer_type => 'zanran';
spice caller => 'DDG::Spice::Zanran';


ddg_spice_test(
  [qw(
    DDG::Spice::Zanran
  )],
  'price of gasoline' => test_spice('/js/spice/zanran/price%20of%20gasoline'),
  'PRICE OF GASOLINE' => test_spice('/js/spice/zanran/price%20of%20gasoline'),
  'something irrelevant' => undef,
);

done_testing;
