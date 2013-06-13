#!/usr/bin/env perl

use strict;

use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;

# Define Location for purpose of the test
my $loc = test_location("de");

my $req = DDG::Request->new( query_raw => "currently in theaters", location => $loc );
ddg_spice_test(
		["DDG::Spice::InTheaters"],
		$req,
		test_spice(
			  '/js/spice/in_theaters/in_theaters/'.$loc->country_code,
				is_cached => 0,
				caller => "DDG::Spice::InTheaters"
		)
);

done_testing;