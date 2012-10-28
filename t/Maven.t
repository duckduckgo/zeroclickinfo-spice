#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maven )],
    'mvn guice' => test_spice(
        '/js/spice/maven/guice',
        call_type => 'include',
        caller => 'DDG::Spice::Maven',
        is_unsafe => 1
    ),
    'maven guice' => test_spice(
        '/js/spice/maven/guice',
        call_type => 'include',
        caller => 'DDG::Spice::Maven',
        is_unsafe => 1
    ),
    'guice mvn' => test_spice(
        '/js/spice/maven/guice',
        call_type => 'include',
        caller => 'DDG::Spice::Maven',
        is_unsafe => 1
    ),
    'guice maven' => test_spice(
        '/js/spice/maven/guice',
        call_type => 'include',
        caller => 'DDG::Spice::Maven',
        is_unsafe => 1
    ),
    'mvn commons collections' => test_spice(
        '/js/spice/maven/commons%20collections',
        call_type => 'include',
        caller => 'DDG::Spice::Maven',
        is_unsafe => 1
    ),
);

done_testing;
