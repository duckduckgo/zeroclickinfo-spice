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
  'oil production in saudi arabia' => test_spice(
    '/js/spice/zanran/oil%20production%20in%20saudi%20arabia',
    caller    => 'DDG::Spice::Zanran',
  ),
  'agriculture contribution to gdp' => test_spice(
    '/js/spice/zanran/agriculture%20contribution%20to%20gdp',
    caller    => 'DDG::Spice::Zanran',
  ),
  'construction injuries australia' => test_spice(
    '/js/spice/zanran/construction%20injuries%20australia',
    caller    => 'DDG::Spice::Zanran',
  ),
  'global mobile data usage' => test_spice(
    '/js/spice/zanran/global%20mobile%20data%20usage',
    caller    => 'DDG::Spice::Zanran',
  ),
);

done_testing;
