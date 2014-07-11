#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::PeopleInSpace)],

    'people in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'people in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'number of people in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'people in space right now' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'number of people in orbit right now' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
);

done_testing;

