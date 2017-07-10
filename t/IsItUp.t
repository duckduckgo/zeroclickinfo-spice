#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

sub build_test {
    my ($url) = @_;
    return test_spice(
        '/js/spice/is_it_up/'.$url,
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    );
}

ddg_spice_test(
    [qw( DDG::Spice::IsItUp )],
    'is duckduckgo.com up'                    => build_test('duckduckgo.com'),
    'is http://duckduckgo.com up?'            => build_test('duckduckgo.com'),
    'is http://duckduckgo.com online'         => build_test('duckduckgo.com'),
    'http://duckduckgo.com status???????????' => build_test('duckduckgo.com'),
    'is http://duckduckgo.com down?'          => build_test('duckduckgo.com'),
    'is føtex.dk up?'                         => build_test('f%C3%B8tex.dk'),
    'is https://føtex.dk up?'                 => build_test('f%C3%B8tex.dk'),
    'is reddit.com working?'                  => build_test('reddit.com'),
    'is https://twitch.tv up??'               => build_test('twitch.tv'),
    'isitup duckduckgo.com'                   => build_test('duckduckgo.com'),
    'is it up duckduckgo.com'                 => build_test('duckduckgo.com'),
    'is it up http://duckduckgo.com'          => build_test('duckduckgo.com'),
    'isitdown duckduckgo.com'                 => build_test('duckduckgo.com'),
    'is it down duckduckgo.com'               => build_test('duckduckgo.com'),
    'is duckduckgo.com up right now'          => build_test('duckduckgo.com'),
    'status of duckduckgo.com'                => build_test('duckduckgo.com'),
    'isitup t-online.de'                      => build_test('t-online.de'),
    'schema.org update time' => undef,
    'is it up?'              => undef,
    'is it down'             => undef,
    'is site up'             => undef,
    'is site down?'          => undef,
    't-online.de'            => undef,
    'isitdown'               => undef,
    'isitup'                 => undef
);
done_testing;

