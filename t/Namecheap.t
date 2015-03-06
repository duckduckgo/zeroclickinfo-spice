#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;


ddg_spice_test(
    [qw(DDG::Spice::Namecheap)],
    'namecheap ddg.gg'                              => expected_output_for('ddg.gg'),
    'namecheap http://ddg.gg'                       => expected_output_for('ddg.gg'),
    'namecheap http://ddg.gg/'                      => expected_output_for('ddg.gg'),
    'namecheap http://example.com'                  => expected_output_for('example.com'),
    'namecheap http://example.org'                  => expected_output_for('example.org'),
    'namecheap http://moon.io'                      => expected_output_for('moon.io'),

    # queries which should not trigger
    'namecheap http://www.example.org'              => undef, # subdomain is not a domain
    'namecheap http://www.example.org/'             => undef, # subdomain is not a domain
    'namecheap http://www.example.org/path/to/file' => undef, # subdomain is not a domain
    'namecheap http://my.cool.domain.org'           => undef, # subdomain is not a domain
    'namecheap http://my.cool.domain.co.uk'         => undef, # subdomain is not a domain
    'namecheap http://jupiters.moon.io'             => undef, # subdomain is not a domain

    'example.com'                    => undef, # no naked domain
    'namecheap example'              => undef, # does not have a TLD
    'namecheap test.example.notatld' => undef, # not a valid TLD
);

# Returns the output we expect to receive from the test
# when the domain spice is triggered properly.
sub expected_output_for {
    # get the domain we expect for the spice trigger
    my ($domain_expected) = @_;
    return undef if !defined $domain_expected;

    # return the output we expect for the spice test
    return test_spice(
        '/js/spice/namecheap/' . $domain_expected,
        call_type => 'include',
        caller => 'DDG::Spice::Namecheap',
    );
}

done_testing;
