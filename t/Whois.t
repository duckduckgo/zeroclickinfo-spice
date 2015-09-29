#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(

    # This is the name of the Spice that will be loaded to test.
    [ 'DDG::Spice::Whois' ],

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain should trigger.
    #'duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # A naked domain should NOT trigger.
    'duckduckgo.com' => undef,

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain with 'www' should trigger.
    #'http://www.duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # Domains should be lowercased
    #'dUcKdUcKgO.cOm' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain with a subdomain that's not 'www' should not trigger.
    #'blah.duckduckgo.com' => undef,

    # Whois keywords with a subdomain that's not 'www' should trigger.
    'whois blah.duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain with an unknown tld should not trigger.
    #'blah.duckduckgo.wtflmao' => undef,

    # Whois keywords with an unknown tld should not trigger.
    'whois blah.duckduckgo.wtflmao' => undef,

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain with a port should not trigger.
    #'duckduckgo.com:8000' => undef,

    # Whois keywords with a port should trigger.
    'whois duckduckgo.com:8000' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A naked domain with a resource path should not trigger.
    #'duckduckgo.com/about' => undef,

    # Whois keywords with a resource path should trigger.
    'whois duckduckgo.com/about' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A domain preceeded by 'http://' should trigger.
    #'http://duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A domain preceeded by 'http://' and 'www' should trigger.
    #'http://www.duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # 2014.09.29 - Removed naked domain triggering.
    #
    # A domain preceeded by 'http://' and a subdomain that's not 'www' should not trigger.
    #'http://blah.duckduckgo.com' => undef,

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

    # whois keywords should be case insensitive
    'hOw To bUy duckduckgo.com' => expected_output_for('duckduckgo.com'),

    # leading and trailing spaces should be allowed
    '    how to buy duckduckgo.com      ' => expected_output_for('duckduckgo.com'),

    # a trailing question mark should be allowed
    'is duckduckgo.com available?' => expected_output_for('duckduckgo.com'),

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
    
    # domain containing a number should trigger
    'whois duckduckgo99.com' => expected_output_for('duckduckgo99.com'),

    # whois keywords without a url should not trigger
    'whois' => undef,
    'whois tom cruise' => undef,
    'lookup' => undef,
    "lookup someone's phone number" => undef,
    'domain' => undef,
    'eminent domain' => undef,
    'is domain' => undef,
    'available' => undef,
    'fios available' => undef,
    'is available' => undef,
    'is water available' => undef,
    'register' => undef,
    'register to vote' => undef,
    'owner' => undef,
    'owner of seattle mariners' => undef,
    'who owns' => undef,
    'who owns 20 Paoli Pike' => undef,
    'buy' => undef,
    'buy stocks online' => undef,
    'how to buy' => undef,
    'how to buy a TV' => undef,

);

# Returns the output we expect to receive from the test
# when the domain spice is triggered properly.
sub expected_output_for {

    # get the domain we expect for the spice trigger
    my ($domain_expected) = @_;
    return undef if !defined $domain_expected;

    # return the output we expect for the spice test
    return test_spice(
        '/js/spice/whois/' . $domain_expected,
        call_type => 'include',
        caller => 'DDG::Spice::Whois',
    );
}

done_testing;
