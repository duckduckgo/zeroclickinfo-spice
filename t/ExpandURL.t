#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %q = (
  'http://bit.ly/a'               => 'bit.ly%2Fa',
  'http://bit.ly/aBc'             => 'bit.ly%2FaBc',
  'https://4sq.com/foo'           => '4sq.com%2Ffoo',

  'expand ddg.gg'                 => 'ddg.gg',
  'expand http://t.co/abc123'     => 't.co%2Fabc123',
  'expand http://t.co/3BjGmvnowY' => 't.co%2F3BjGmvnowY'
);

ddg_spice_test(
  [qw( DDG::Spice::ExpandURL)],
  map {
    $_ => test_spice( '/js/spice/expand_url/'.$q{$_}, caller => 'DDG::Spice::ExpandURL' )
  } keys %q,
);

done_testing;