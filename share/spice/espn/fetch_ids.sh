#!/usr/bin/env perl

use strict;
use warnings;

use JSON;
use Data::Dumper;

my $json;
{
  local $/;
  open my $fh, '<', $ARGV[0];
  $json = <$fh>;
  close $fh;
}

my $response = decode_json $json;

if (exists $response->{sports}[0]{leagues}[0]{athletes}) {
  my @athletes = $response->{sports}[0]{leagues}[0]{athletes};
  map {
    my $name = lc $_->{displayName};
    print "  '$name' => $_->{id},\n"
  } @{$athletes[0]};
} elsif (exists $response->{sports}[0]{leagues}[0]{teams}){
  my @teams = $response->{sports}[0]{leagues}[0]{teams};
  map {
    my $location = lc $_->{location};
    my $name = lc $_->{name};
    print "  '$location $name' => $_->{id},\n";
    print "  'the $location $name' => $_->{id},\n";
  } @{$teams[0]};
}
