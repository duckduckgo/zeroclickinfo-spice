#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

# These reference nodes expected to stay online.
my $node_ip  = "198.96.155.3";
my $node_fp1 = "BCEDF6C193AA687AE471B8A22EBF6BC57C2D285E";
my $node_fp2 = "3E0908F131AC417C48DDD835D78FB6887F4CD126";

sub expected_output_for {
    my ($node, $limit) = @_;
    return undef if !defined $node;
    return test_spice(
        '/js/spice/tor_node/' . $node . '/' . $limit,
        call_type => 'include',
        caller => 'DDG::Spice::TorNode',
        is_cached => 0
    );
}

ddg_spice_test(
    [ 'DDG::Spice::TorNode' ],

    # Ensure bare identifiers don't trigger our answer.
    $node_ip  => undef,
    $node_fp1 => undef,
    $node_fp2 => undef,

    # Ensure bare triggers don't trigger our answer.
    "tor node"        => undef,
    "tor exit"        => undef,
    "tor exit node"   => undef,
    "tor relay"       => undef,
    "tor relay node"  => undef,
    "tor bridge"      => undef,
    "tor bridge node" => undef,

    "tor node $node_ip"  => expected_output_for($node_ip, 1),
    "tor node $node_fp1" => expected_output_for($node_fp1, 1),
    "tor node $node_fp2" => expected_output_for($node_fp2, 1),

    "tor exit $node_ip"  => expected_output_for($node_ip, 1),
    "tor exit $node_fp2" => expected_output_for($node_fp2, 1),
    "tor exit $node_fp2" => expected_output_for($node_fp2, 1),

    "tor exit node $node_ip"  => expected_output_for($node_ip, 1),
    "tor exit node $node_fp2" => expected_output_for($node_fp2, 1),
    "tor exit node $node_fp2" => expected_output_for($node_fp2, 1),

    "tor relay $node_ip"  => expected_output_for($node_ip, 1),
    "tor relay $node_fp1" => expected_output_for($node_fp1, 1),
    "tor relay $node_fp2" => expected_output_for($node_fp2, 1),

    "tor relay node $node_ip"  => expected_output_for($node_ip, 1),
    "tor relay node $node_fp1" => expected_output_for($node_fp1, 1),
    "tor relay node $node_fp2" => expected_output_for($node_fp2, 1),

    "tor bridge $node_ip"  => expected_output_for($node_ip, 1),
    "tor bridge $node_fp1" => expected_output_for($node_fp1, 1),
    "tor bridge $node_fp2" => expected_output_for($node_fp2, 1),

    "tor bridge node $node_ip"  => expected_output_for($node_ip, 1),
    "tor bridge node $node_fp1" => expected_output_for($node_fp1, 1),
    "tor bridge node $node_fp2" => expected_output_for($node_fp2, 1),
);

done_testing;
