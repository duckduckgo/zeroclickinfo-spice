#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use JSON::MaybeXS;
use URI::Escape;

# PASSING TESTS
my @t = (

    # All platforms
    'flight search app'      => {
    query                    => 'flight%20search',
    platform_ids             => uri_escape (encode_json [(2004, 2005, 2008, 2015, 8556073)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    'flight tracking app'    => {
    query                    => 'flight%20tracking',
    platform_ids             => uri_escape (encode_json [(2004, 2005, 2008, 2015, 8556073)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    'free calculator app'    => {
    query                    => 'calculator',
    platform_ids             => uri_escape (encode_json [(2004, 2005, 2008, 2015, 8556073)]),
    price                    => '0',
    custom_id                => '2414062669'
    },

    'free angry birds app'   => {
    query                    => 'angry%20birds',
    platform_ids             => uri_escape (encode_json [(2004, 2005, 2008, 2015, 8556073)]),
    price                    => '0',
    custom_id                => '2414062669'
    },

    'quixey angry birds' => {
    query                    => 'angry%20birds',
    platform_ids             => uri_escape (encode_json [(2004, 2005, 2008, 2015, 8556073)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    # Android apps
    'android calculator app' => {
    query                    => 'calculator',
    platform_ids             => uri_escape (encode_json [(2005)]),
    price                    => '999999',
    custom_id                => '75675980'
    },

    'google play store traffic' => {
    query                    => 'traffic',
    platform_ids             => uri_escape (encode_json [(2005)]),
    price                    => '999999',
    custom_id                => '75675980'
    },

    # iOS apps
    'flight tracker ios app' => {
    query                    => 'flight%20tracker',
    platform_ids             => uri_escape (encode_json [(2004)]),
    price                    => '999999',
    custom_id                => '78989893'
    },

    'vlc on iphone'          => {
    query                    => 'vlc',
    platform_ids             => uri_escape (encode_json [(2004)]),
    price                    => '999999',
    custom_id                => '78989893'
    },

    'quixey free sparrow mail ios' => {
    query                    => 'sparrow%20mail',
    platform_ids             => uri_escape (encode_json [(2004)]),
    price                    => '0',
    custom_id                => '78989893'
    },

    'path app for ipad' => {
    query                    => 'path',
    platform_ids             => uri_escape (encode_json [(2015)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    'tiny piano for iphone' => {
    query                    => 'tiny%20piano',
    platform_ids             => uri_escape (encode_json [(2004)]),
    price                    => '999999',
    custom_id                => '78989893'
    },

    # Blackberry apps
    'whatsapp for blackberry' => {
    query                    => 'whatsapp',
    platform_ids             => uri_escape (encode_json [(2008)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    'twitter for playbook' => {
    query                    => 'twitter',
    platform_ids             => uri_escape (encode_json [(2008)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },

    # Windows apps
    'windows phone 8 facebook' => {
    query                    => 'facebook',
    platform_ids             => uri_escape (encode_json [(8556073)]),
    price                    => '999999',
    custom_id                => '2414062669'
    },
);

while (@t) {
    my $query = shift @t;
    my %result = %{shift @t};
    my $req = DDG::Request->new( query_raw => $query );

    ddg_spice_test(
        ["DDG::Spice::Quixey"],
        $req,
        test_spice(
            '/js/spice/quixey/'.$result{query}.'/'.$result{platform_ids}.'/'.$result{price}.'/'.$result{custom_id},
            caller => "DDG::Spice::Quixey"
        )
    );
};

# FAILING TESTS
# These queries should NOT trigger the plugin

my @q = (
  # Queries with numbers
  "androd broken on ebay",
  "android broken phone",
  "android broken screen",
  "android chargin cable",
  "android random shutoff",
  "android repair",
  "android restart",
  "android uninstall google voice",
  "best android games",
  "contractor ios developer rates",
  "default iphone root password",
  "facebook android login blank",
  "how to turn off android phone",
  "ios testing games",
  "ipone cracked screen",
  "windows 8 license",
  "windows 8 skype keeps closing",
  "apple ios 5 musicplayer tutorial",
  "trainyard app release date",
  "google glass apps",
  "glassware apps",
  "OSX Alarm clock",
  "osx apps"
);

ddg_spice_test(
  [qw(DDG::Spice::Quixey)],
  map {
    $_ => undef
  } @q,
);

done_testing;
