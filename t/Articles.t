#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Articles )],
    
    'nyt' => test_spice(
        '/js/spice/articles/http%3A%2F%2Fwww.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml',
        call_type => 'include',
        caller => 'DDG::Spice::Articles',
    ),
    
    # No results if not exact match
    'nyt is cool' => undef,
);

done_testing;

