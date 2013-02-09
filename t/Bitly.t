#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitly )],
    'bitly http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/bitly/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Bitly'
    ),
    'shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/bitly/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Bitly'
    ),
    'url shorten http://www.duckduckgo.com/about.html' => test_spice(
        '/js/spice/bitly/http/www.duckduckgo.com%2Fabout.html',
        call_type => 'include',
        caller => 'DDG::Spice::Bitly'
    ),
);

done_testing;

