#!/usr/bin/env perl

use strict;
use warnings;

use JSON;
use LWP::Simple;
use Data::Dumper;

sub parse_players {
    my $json = shift;
    my @athletes = $json->{sports}[0]{leagues}[0]{athletes};
    map { print lc "  '$_->{displayName}' => $_->{id},\n" } @{$athletes[0]};
    return $json;
}

sub parse_teams {
    my $json = shift;
    if (exists $json->{sports}[0]{leagues}[0]{teams}){
      my @teams = $json->{sports}[0]{leagues}[0]{teams};
      map {
        print lc "  '$_->{location} $_->{name}' => $_->{id},\n";
        print lc "  'the $_->{location} $_->{name}' => $_->{id},\n";
      } @{$teams[0]};
    }
    return $json;
}

sub parse {
    my ($resource, $sub) = @_;
    my %subs = (
        'players' => \&parse_players,
        'teams'   => \&parse_teams,
    );

    my $json = $subs{$sub}(decode_json get $resource);

    my $resultsCount  = $json->{resultsCount};
    my $resultsLimit  = $json->{resultsLimit};
    my $resultsOffset = 0;
    
    while (($resultsOffset += $resultsLimit) < $resultsCount) {
        $subs{$sub}(decode_json get "$resource$resultsOffset");
    }
}

my $offset = 0;

my $api = "http://api.espn.com/v1/sports/basketball/nba/athletes?apikey=$ENV{DDG_SPICE_ESPN_APIKEY}&offset=";

parse $api, 'players';
