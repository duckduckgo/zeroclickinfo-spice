#!/usr/bin/env perl

use strict;
use warnings;

use JSON;
use LWP::Simple;
use Data::Dumper;

my $api = 'http://api.espn.com/v1/sports?'
        . "apikey=$ENV{DDG_SPICE_ESPN_APIKEY}";

my $json = decode_json get $api;

map { print "$_->{name}\n" } @{$json->{sports}};
