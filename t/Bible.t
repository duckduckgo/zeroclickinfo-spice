#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use_ok('DDG::Spice::Bible');

spice caller => 'DDG::Spice::Bible';
spice call_type => 'include';
spice answer_type => 'bible';

ddg_spice_test(
  [qw(
    DDG::Spice::Bible
  )],
  'bible hebrews 8:2' => test_spice('/js/spice/bible/hebrews%208%3A2'),
  # 'exodus 5:10' => test_spice('/js/spice/bible/exodus%205%3A10'),
);

done_testing;

