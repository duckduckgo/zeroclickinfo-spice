#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::MetaCPAN) ],
    create_tests('App::DuckPAN'    => '/js/spice/meta_cpan/App%3A%3ADuckPAN'   ),
    create_tests('App-DuckPAN'     => '/js/spice/meta_cpan/App%3A%3ADuckPAN'   ),
    create_tests('WWW::DuckDuckGo' => '/js/spice/meta_cpan/WWW%3A%3ADuckDuckGo'),
);

sub create_tests {
    my $lib      = shift;
    my $call     = shift;
    my @triggers = ( 'cpan', 'cpanm', 'meta cpan', 'metacpan' );
    my $caller   = 'DDG::Spice::MetaCPAN';
    my @tests;

    push @tests, "$_ $lib" => test_spice($call, caller => 'DDG::Spice::MetaCPAN')
        foreach @triggers;

    return @tests;
}

done_testing;
