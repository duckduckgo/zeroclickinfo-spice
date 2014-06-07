#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use LWP::Simple;
use JSON::XS;
use URI::Escape;
my $data = get("http://store.steampowered.com/api/getappsincategory/?category=cat_specials");
my $decoded = JSON::XS::decode_json($data);
my $idmap = join(",", map {"$_->{'id'}"} @{$decoded->{"tabs"}->{"viewall"}->{"items"}});
my $result = uri_escape($idmap);
ddg_spice_test(
    [qw(
        DDG::Spice::Steam::Specials
    )],
    'steam specials' => test_spice(
        "/js/spice/steam/specials/$result",
	call_type => 'include',
        caller => 'DDG::Spice::Steam::Specials'
    ),
    'steam offers' => test_spice(
        "/js/spice/steam/specials/$result",
        caller => 'DDG::Spice::Steam::Specials'
    ),
);

done_testing;

