#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maven )],
    'mvn guice' => test_spice(
        '/js/spice/maven/guice',
        caller => 'DDG::Spice::Maven',
    ),
    'maven guice' => test_spice(
        '/js/spice/maven/guice',
        caller => 'DDG::Spice::Maven',
    ),
    'guice mvn' => test_spice(
        '/js/spice/maven/guice',
        caller => 'DDG::Spice::Maven',
    ),
    'guice maven' => test_spice(
        '/js/spice/maven/guice',
        caller => 'DDG::Spice::Maven',
    ),
    'mvn commons collections' => test_spice(
        '/js/spice/maven/commons%20collections',
        caller => 'DDG::Spice::Maven',
    ),
);

done_testing;
