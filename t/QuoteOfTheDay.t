#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::QuoteOfTheDay )],

    'quote for the day' => test_spice(
        '/js/spice/quote_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::QuoteOfTheDay',
    ),
    
    'quote of the day' => test_spice(
        '/js/spice/quote_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::QuoteOfTheDay',
    ),

    'random quote of the day' => undef,
    'quote of the day now' => undef,
    'quote' => undef
);

done_testing;


