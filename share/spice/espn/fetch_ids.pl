#!/usr/bin/env perl

# Recommended invocation:
# ./fetch_ids.pl >>(tee ids) 2>>(tee fetch_ids.errors)
#
# Requires env var DDG_SPICE_ESPN_APIKEY
#
# Outputs perl hashes in the form
# my %sport = ( $organization => \%players );
#
# Logs fetch/decode errors

use strict;
use warnings;

use JSON;
use LWP::Simple;
use Data::Dumper;

my ( $api, $key ) = (
    'http://api.espn.com/v1/sports',
    "$ENV{DDG_SPICE_ESPN_APIKEY}"
);

my %leagues = (
    'football'   => [
        'nfl',
        'college-football',
    ],
    'basketball' => [
        'nba',
        'wnba',
        'mens-college-basketball',
        'womens-college-basketball',
    ],
    'hockey' => [
        'nhl',
        'mens-college-hockey',
        'womens-college-hockey',
    ],
    'golf' => [
        'pga',
        'ntw',
        'sga',
        'lpga',
        'eur',
    ],
    'tennis' => [
        'atp',
        'wta',
    ],
    'racing' => [
        'irl',
        'sprint',
        'nationwide',
        'truck',
        'f1',
        'nhra',
        'alms',
    ],
);

sub parse_players {
    my $json = shift;
    my @athletes = $json->{sports}[0]{leagues}[0]{athletes};
    map {
        my $name = lc $_->{displayName};
        if ($name =~ m/'/) {
            print "\t\t\"$name\" => $_->{id},\n";
            $name =~ s/'//g;
        }
        print "\t\t\"$name\" => $_->{id},\n";
    } @{$athletes[0]};
}

sub parse_teams {
    my $json = shift;
    if (exists $json->{sports}[0]{leagues}[0]{teams}){
        my @teams = $json->{sports}[0]{leagues}[0]{teams};
        map {
            print lc "\t\t'$_->{location} $_->{name}' => $_->{id},\n";
            print lc "\t\t'the $_->{location} $_->{name}' => $_->{id},\n";
        } @{$teams[0]};
    }
}

my %parse = (
    'players' => \&parse_players,
    'teams'   => \&parse_teams,
);

sub fetch {
    my ( $resource, $json ) = shift;
    eval { $json = decode_json get $resource; };
    if ($@) {
        warn "Failed to fetch '$resource': ", $@;
        return;
    }
    return $json;
}

sub retrieve {
    my ( $sport, $organization, $type ) = @_;
    my $resource = "$api/$sport/$_/athletes?apikey=$key";

    $organization =~ s/-/_/g;
    print "\t$organization => {\n";

    my $json = fetch $resource;

    if ($json) {
        $parse{$type}($json);

        my $resultsCount  = $json->{resultsCount};
        my $resultsLimit  = $json->{resultsLimit};
        my $resultsOffset = 0;

        while (($resultsOffset += $resultsLimit) < $resultsCount) {
            $json = fetch "$resource&offset=$resultsOffset";
            $parse{$type}(fetch "$resource&offset=$resultsOffset") if $json;
        }
    }

    print "\t},\n";
}

map {
    my $sport = $_;
    print "my %$sport = (\n";
    map { retrieve $sport, $_, 'players' } @{$leagues{$_}};
    print ");\n";
} keys %leagues;
