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

my @athletes = $response->{sports}[0]{leagues}[0]{athletes};

map {
  my $name = lc $_->{displayName};
  print "  '$name' => $_->{id},\n"
} @{$athletes[0]};
