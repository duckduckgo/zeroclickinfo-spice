#!/usr/bin/env perl

use strict;
use warnings;

use JSON;
use LWP::Simple;
use Data::Dumper;

my ( $api, $key ) = (
    'http://api.espn.com/v1/sports',
    "$ENV{DDG_SPICE_ESPN_APIKEY}"
);

my ( $sports, $organizers ) = #, $divisions ) =
    decode_json get "$api?apikey=$key";

map {
    print "$_->{name} => (\n";
    $organizers = decode_json get "$api/$_->{name}?apikey=$key";
    map { print "\t$_->{abbreviation}\n" } @{$organizers->{sports}[0]{leagues}};
    print ");\n";
} @{$sports->{sports}};
