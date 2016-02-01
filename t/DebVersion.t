#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

my @emacs24 = (
    '/js/spice/deb_version/emacs24',
    call_type => 'include',
    caller    => 'DDG::Spice::DebVersion'
);

ddg_spice_test(
    [ qw(DDG::Spice::DebVersion) ],
    'debian version emacs24' => test_spice(@emacs24),
    'deb ver emacs24' => test_spice(@emacs24),
    'emacs24 debian version' => test_spice(@emacs24),
    'emacs24 latest debian version' => test_spice(@emacs24),
    'debian version for emacs24' => test_spice(@emacs24),
    'debian versions for emacs24' => test_spice(@emacs24),
    'debian versions for latest emacs24' => test_spice(@emacs24),
    'debian versions on wheezy for latest emacs24' => test_spice(@emacs24),

    'what debian version is this' => undef,
    'emacs is the best' => undef,
);

done_testing;
