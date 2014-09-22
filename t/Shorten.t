#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Shorten )],
    'short url http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller    => 'DDG::Spice::Shorten'
    ),
    'shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller    => 'DDG::Spice::Shorten'
    ),
    'url shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/shorten/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller    => 'DDG::Spice::Shorten'
    ),
    'url shorten www.github.com/explore' => test_spice(
        '/js/spice/shorten/http/www.github.com%2Fexplore',
        caller => 'DDG::Spice::Shorten',
    ),
    'shorten duckduckgo.com' => test_spice(
        '/js/spice/shorten/http/duckduckgo.com',
        caller => 'DDG::Spice::Shorten',
    ),
    'duckduckgo.com shorten' => test_spice(
        '/js/spice/shorten/http/duckduckgo.com',
        caller => 'DDG::Spice::Shorten',
    ),
    'https://www.duckduckgo.com/about.html shorten' => test_spice(
        '/js/spice/shorten/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller    => 'DDG::Spice::Shorten'
    ),
    'short URL for duck duck go' => undef,
    'ddg short URL'              => undef,
);

done_testing;

