#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %q = (
  'expand ddg.gg'             => 'ddg.gg',
  'http://bit.ly/a'           => 'bit.ly%2Fa',
  'https://4sq.com/foo'       => '4sq.com%2Ffoo',
  'expand http://t.co/abc123' => 't.co%2Fabc123',
  'expand http://t.co/abc123' => 't.co%2Fabc123'
);

ddg_spice_test(
  [qw( DDG::Spice::ExpandURL)],
  map {
    $_ => test_spice( '/js/spice/expand_url/'.$q{$_}, caller => 'DDG::Spice::ExpandURL' )
  } keys %q,
);

done_testing;