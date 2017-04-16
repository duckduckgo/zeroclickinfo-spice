#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use_ok('DDG::Spice::Apartable::City');
use_ok('DDG::Spice::Apartable::CityState');
use_ok('DDG::Spice::Apartable::ZipCode');

done_testing;
