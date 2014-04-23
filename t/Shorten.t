#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Shorten )],
    'short url http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http%3A%2F%2Fwww.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Shorten'
    ),
    'shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http%3A%2F%2Fwww.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Shorten'
    ),
    'url shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http%3A%2F%2Fwww.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Shorten'
    ),
    'url shorten www.github.com/explore' => test_spice(
        '/js/spice/shorten/www.github.com%2Fexplore',
        caller    => 'DDG::Spice::Shorten',
    ),
);

done_testing;

