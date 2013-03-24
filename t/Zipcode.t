#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# PASSING TESTS
my %q = (
  
  # Without Country
  "19301"            => ["19301", "ZZ"],
  "19301-"           => ["19301", "ZZ"],
  "zip 19301"        => ["19301", "ZZ"],
  "zipcode 19301"    => ["19301", "ZZ"],
  "zip code 19301"   => ["19301", "ZZ"],
  "postalcode 19301" => ["19301", "ZZ"],

  # With Country
  "L1M1L8 Canada"    => ["L1M1L8", "CA"],
  "L1M 1L8 Canada"   => ["L1M1L8", "CA"],
  "19087 USA"        => ["19087", "US"],
  "19087-123 USA"    => ["19087-123", "US"]
);

ddg_spice_test(
  [qw( DDG::Spice::Zipcode)],
  map {
    $_ => test_spice( '/js/spice/zipcode/'.$q{$_}[0].'/'.$q{$_}[1], caller => 'DDG::Spice::Zipcode' )
  } keys %q,
);


# FAILING TESTS
# No Postal Code
# These should trigger but not make an API call

my @q = (
  # Queries with numbers
  "10 acres to square feet",
  "100 Best Commercial Fonts Ever Made from FONTSHOP",
  "1314 Scotland freedom",
  "14th precinct",
  "14th precinct map",
  "2004 v6 rwhp",
  "2004 v6 rwhp stock",
  "2012 calendar",
  "2013 album releases",
  "22magrevolver",
  "3%2Dvariable transfer function",
  "30 acres to square feet",
  "37 grant street wellsboro pa",
  "37 grant street wellsboro pa trulia",
  "386 bios mod",
  "3x3 matrix taylor series",
  "4560228203110",
  "4560228203110",
  "4chan ban appeal",
  "4chan unbanned",
  "4chanrandom",
  "4e charop forum",
  "521 bit elliptic curve public key",
  "57 degrees",
  "605 area code",
  "8px bitmap font",
  "90 525i  bmw headlight fuse",
  "98 mercedes e320 stuck in park",
  "akb48 senbatsu",
  "BMW 2002 weight",
  "doom 3 cabinet codes",
  "dota 2 sptorm spirit",
  "dota 2 storm spirit",
  "drupaldelphia 2011",
  "fedora 18 partition type",
  "fin 370 version 7",
  "gamestop 3ds",
  "gtx 660 ti",
  "ipad3 vs ipad4",
  "iphone 5 wont turn on",
  "Katy256",
  "libdvdread4",
  "maroon 5 payphones",
  "mossberg 590A1",
  "movie2k",
  "mp4 box gui",
  "mvc4 helper",
  "nacl 512 bit public key",
  "psalm 136 explained",
  "px 320 stand",
  "px 320 stand  amazon",
  "Rule 34 leela",
  "Rule 34 leela",
  "siltech 770l review",
  "tf2 color change",
  "tf2 color change",
  "tf2 source color change",
  "tl594 circuits",
  "tlac 02255 wrong computer resolution",
  "u12 blog",
  "u18 idol",
  "windows 8 licesense",
  "windows 8 skype keeps closing"
);

ddg_spice_test(
  [qw( DDG::Spice::Zipcode)],
  map {
    $_ => undef
  } @q,
);

done_testing;