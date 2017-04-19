#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SwiftDocs)],
    'swift foreach' => test_spice(
        '/js/spice/swift_docs/foreach',
        call_type => 'include',
        caller => 'DDG::Spice::SwiftDocs'
    ),
    'swift doc successor' => test_spice(
        '/js/spice/swift_docs/successor',
        call_type => 'include',
        caller => 'DDG::Spice::SwiftDocs'
    ),
    'swiftdoc successor' => test_spice(
        '/js/spice/swift_docs/successor',
        call_type => 'include',
        caller => 'DDG::Spice::SwiftDocs'
    ),
    'successor swiftdoc' => test_spice(
        '/js/spice/swift_docs/successor',
        call_type => 'include',
        caller => 'DDG::Spice::SwiftDocs'
    ),
);

done_testing;

