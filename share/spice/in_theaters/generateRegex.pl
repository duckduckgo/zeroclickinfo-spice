#!/usr/bin/perl

use warnings;
use strict;

# Extracted from http://www.jhall.demon.co.uk/currency/by_country.html

print "Input comma separated list of words:\n";
my $temp = <>;

my @words = split(',', $temp);

print "\nInput filename:\n";
my $name = <>;
print "\n";

use Regexp::List;

my $regexp  = Regexp::List->new;
my $qr = $regexp->set(modifiers=>'i')->list2re(@words);
my $tmp = $qr;
$tmp =~ s/^\(\?\-xism\:\(\?i\://s;
$tmp =~ s/\)\)$//s;

open(OUT,">$name");
print OUT qq(my \$$name = qr/\\b$tmp\\b/i;\n);
close(OUT);

print "Done! Your file has been created.\n"
