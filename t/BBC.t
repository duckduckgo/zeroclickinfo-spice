#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DateTime;

my $dt = DateTime->now->set_time_zone( 'America/New_York' );
my $today = $dt->year . '/' . $dt->month . '/' . $dt->day;

$dt->add(days => 1);
my $tomorrow = $dt->year . '/' . $dt->month . '/' . $dt->day;

my %q = (
  "what's on bbc 3"               => "bbcthree/$today",
  "bbc radio 1 schedule"          => "radio1/england/$today",
  "bbc two schedule for tomorrow" => "bbctwo/england/$tomorrow",
  "what's on bbc"                 => "bbcone/london/$today",
  "what's on bbc three"           => "bbcthree/$today",
);

ddg_spice_test(
  [qw( DDG::Spice::BBC)],
  map {
    $_ => test_spice( '/js/spice/bbc/'.$q{$_},
    caller => 'DDG::Spice::BBC',
    is_cached => 0 )
  } keys %q,
);

done_testing;
