#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Envato )],
    'themeforest responsive portfolio' => test_spice(
        '/js/spice/envato/themeforest/responsive%7Cportfolio',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'audiojungle happy electronic' => test_spice(
        '/js/spice/envato/audiojungle/happy%7Celectronic',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'graphicriver creative business card' => test_spice(
        '/js/spice/envato/graphicriver/creative%7Cbusiness%7Ccard',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    '3docean high poly car' => test_spice(
        '/js/spice/envato/3docean/high%7Cpoly%7Ccar',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'activeden music player widget' => test_spice(
        '/js/spice/envato/activeden/music%7Cplayer%7Cwidget',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'codecanyon royal slider' => test_spice(
        '/js/spice/envato/codecanyon/royal%7Cslider',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'videohive sport pack' => test_spice(
        '/js/spice/envato/videohive/sport%7Cpack',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'creative modern portfolio' => undef
);

done_testing;