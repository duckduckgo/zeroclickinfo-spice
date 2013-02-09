#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Gravatar )],
    'gravatar dax@duckduckgo.com' => test_spice(
        '/js/spice/gravatar/58b5a3d8684cc10b5687a81549c94de2',
        call_type => 'include',
        caller => 'DDG::Spice::Gravatar'
    ),
);

done_testing;

