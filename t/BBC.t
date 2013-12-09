#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DateTime;

my $dt = DateTime->now->set_time_zone( 'America/New_York' );

my %q = (
  'what\'s on bbc 3'              => 'bbcthree/'.$dt->year().'/'.$dt->month().'/'.$dt->day(),
  'bbc radio 1 schedule'          => 'radio1/england/'.$dt->year().'/'.$dt->month().'/'.$dt->day(),
  'bbc two schedule for tomorrow' => 'bbctwo/england/'.$dt->add( days => 1 )->year().'/'.$dt->month().'/'.$dt->day(),
);

ddg_spice_test(
  [qw( DDG::Spice::BBC)],
  map {
    $_ => test_spice( '/js/spice/bbc/'.$q{$_},
    caller => 'DDG::Spice::BBC' )
  } keys %q,
);

done_testing;
