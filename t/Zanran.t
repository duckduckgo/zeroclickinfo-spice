#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
# use DDG::Test::Goodie;
use DDG::Test::Spice;

use_ok('DDG::Spice::Zanran');

# zci answer_type => 'convert to ascii';                                                                                    
# zci is_cached => 1;

ddg_spice_test(
  [qw(
    DDG::Spice::Zanran
  )],
  'price of gasoline' => test_spice('/js/spice/zanran/',
                                    call_type => 'include',
                                    answer_type => 'zanran',
                                    caller => 'DDG::Spice::Zanran'
  ),
  'something irrelevant' => undef,
);

done_testing;
