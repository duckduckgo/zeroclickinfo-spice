#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Lobbying )],
    'exxon lobbying' => test_spice(
        '/js/spice/lobbying/exxon',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'Barack Obama campaign contributions' => test_spice(
        '/js/spice/lobbying/barack%20obama',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'University campaign contribution' => test_spice(
        '/js/spice/lobbying/university',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'campaign finances Barack Obama' => test_spice(
        '/js/spice/lobbying/barack%20obama',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'University lobbying' => test_spice(
        '/js/spice/lobbying/university',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'University lobbyist' => test_spice(
        '/js/spice/lobbying/university',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    ),
    'University contribution' => test_spice(
        '/js/spice/lobbying/university',
        call_type => 'include',
        caller => 'DDG::Spice::Lobbying'
    )
);

done_testing;

