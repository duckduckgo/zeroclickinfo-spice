#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(

    # This is the name of the Spice that will be loaded to test.
    [ 'DDG::Spice::Domains' ],

     # A naked domain should trigger.
    'duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # A naked domain with 'www' should trigger.
    'http://www.duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # A naked domain with a subdomain that's not 'www' should not trigger.
    'blah.duckduckgo.com' => undef,

    # A naked domain with an unknown tld should not trigger.
    'blah.duckduckgo.wtflmao' => undef,

    # A naked domain with a port should not trigger.
    'duckduckgo.com:8000' => undef,

    # A naked domain with a resource path should not trigger.
    'duckduckgo.com/about' => undef,

     # A domain preceeded by 'http://' should trigger.
    'http://duckduckgo.com' => expected_output_for('duckduckgo.com'),

     # A domain preceeded by 'http://' and 'www' should trigger.
    'http://www.duckduckgo.com' => expected_output_for('duckduckgo.com'),

     # A domain preceeded by 'http://' and a subdomain that's not 'www' should not trigger.
    'http://blah.duckduckgo.com' => undef,

     # A random keyword before the domain should not trigger
    'blah duckduckgo.com' => undef,

     # A random keyword after the domain should not trigger
    'duckduckgo.com blah' => undef,

    # whois keywords before a url should trigger
    'whois duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'lookup duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'domain duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'is domain duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'available duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'is available duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'register duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'owner duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'owner of duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'who owns duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'buy duckduckgo.com' => expected_output_for('duckduckgo.com'),
    'how to buy duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # whois keywords after a url should trigger
    'duckduckgo.com whois' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com lookup' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com domain' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com is domain' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com available' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com is available' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com register' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com owner' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com who owns' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com buy' => expected_output_for('duckduckgo.com'),
    'duckduckgo.com how to buy' => expected_output_for('duckduckgo.com'),

    # whois keywords without a url should not trigger
    'whois' => undef,
    'lookup' => undef,
    'domain' => undef,
    'is domain' => undef,
    'available' => undef,
    'is available' => undef,
    'register' => undef,
    'owner' => undef,
    'owner' => undef,
    'who owns' => undef,
    'buy' => undef,
    'how to buy' => undef,

);

# Returns the output we expect to receive from the test
# when the domain spice is triggered properly.
sub expected_output_for {

    # get the domain we expect for the spice trigger
    my ($domain_expected) = @_;
    return undef if !defined $domain_expected;

    # return the output we expect for the spice test
    return test_spice(
        '/js/spice/domains/' . $domain_expected,
        call_type => 'include',
        caller => 'DDG::Spice::Domains',
    );
}

done_testing;
