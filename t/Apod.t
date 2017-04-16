#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;
use DateTime;
use DateTime::TimeZone;

my $loc  = test_location("us");
my $t = DateTime->now;
$t->set_time_zone($loc->time_zone);
my $query = $t->strftime("%g%m%d");

my $req  = DDG::Request->new( 
    query_raw => "apod", 
    location => $loc 
);

ddg_spice_test(
    ["DDG::Spice::Apod"],
    $req,
    test_spice(
        "/js/spice/apod/$query",
        caller => "DDG::Spice::Apod",
    ),
    'astronomy picture of day' => test_spice(
        "/js/spice/apod/$query",
        caller    => 'DDG::Spice::Apod',
    ),
);
done_testing;
