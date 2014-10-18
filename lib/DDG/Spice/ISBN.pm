package DDG::Spice::ISBN;
# ABSTRACT: Returns book details for a query ISBN.

use strict;
use warnings;

use DDG::Spice;

use List::Util qw( sum );

primary_example_queries     "isbn 0330287001", "ISBN number 0-06-250217-4";
secondary_example_queries   "0-330-2870 0-1  ISBN", "978 0 7432 4722 1 ISBN lookup";
name                        "ISBN";
description                 "Returns book details for a query ISBN";
source                      "http://amazon.com/";
code_url                    "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ISBN.pm";
category                    "reference";
topics                      "everyday", "entertainment", "special_interest";
attribution github  =>      ["https://github.com/nishanths/", "Nishanth Shanmugham"],
            twitter =>      ["https://twitter.com/nshanmugham/", "Nishanth Shanmugham"],
            web     =>      ["http://nishanths.github.io/", "Nishanth Shanmugham"];

spice to            =>      'https://duckduckgo.com/m.js?q=$1&cb={{callback}}';
spice is_cached     =>      1;

triggers query_raw => qr/[0-9\s-]{10,}/;    # Look for at least 10 digits, spaces and dashes in a row;

my %skip_words = map { $_ => 1 } qw( isbn number lookup );    # Appreciate if they tried to give us more context.

handle query_lc => sub {
    my $query_cleaned = join '', (grep { defined $_ && !$skip_words{$_} } split /[\s-]/);

    return unless (looks_like_isbn($query_cleaned));

    return $query_cleaned;
};

sub looks_like_isbn {
    my $number = shift;

    return unless ($number =~ /^(?:\d{10}|\d{13})$/);    # All ISBNs contain 10 or 13 digits

    my @nums        = split //, $number;
    my $check_digit = pop @nums;                         # Last digit is the check digit
    my $count       = 0;                                 # Using pre-increment.
    my $checksum;
    if (scalar @nums == 12) {
        # ISBN-13: (10 - (Even-place digits * 3 + odd odd-place digits)) mod 10
        $checksum = (10 - sum map { (++$count % 2) ? $_ : $_ * 3 } @nums) % 10;
    } else {
        # ISBN-10: (digit * 11 - place) % 11
        $checksum = 11 - (sum map { (11 - ++$count) * $_ } @nums) % 11;
    }

    $checksum = $checksum % 10;                          # Considering the above 10 to 0, basically;

    return $checksum == $check_digit;
}

1;
