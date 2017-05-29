package DDG::Spice::ISBN;
# ABSTRACT: Returns book details for a query ISBN.

use strict;
use warnings;

use DDG::Spice;

use List::Util qw( sum );

spice to            =>      'https://duckduckgo.com/m.js?q=$1&cb={{callback}}';
spice is_cached     =>      1;

# Look for at least 9 digits, spaces and dashes in a row, possibly ending with an X.
triggers query_lc => qr/[0-9\s-]{9,}x?/;

my %skip_words = map { uc $_ => 1 } qw( isbn number lookup );    # Appreciate if they tried to give us more context.

handle query_lc => sub {

    #ignore phone numbers
    return if m/^\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;

    my $query_cleaned = join '', (grep { !$skip_words{$_} } map { uc $_ } grep { defined } split /[\s-]/);

    return unless (looks_like_isbn($query_cleaned));

    return $query_cleaned;
};

sub looks_like_isbn {
    my $number = shift;

    return unless ($number =~ /^(?:\d{10}|\d{13}|\d{9}X)$/);    # All ISBNs contain 10 or 13 digits, or 9 digits, plus an X

    my @nums        = split //, $number;
    my $check_digit = pop @nums;                                # Last digit is the check digit
    $check_digit = 10 if ($check_digit eq 'X');                 # ISBN-10 is mod 11, this can be X for 10.
    my $count = 0;                                              # Using pre-increment.
    my $checksum;
    if (scalar @nums == 12) {
        # ISBN-13: (10 - (Even-place digits * 3 + odd odd-place digits)) mod 10
        $checksum = ((10 - sum map { (++$count % 2) ? $_ : $_ * 3 } @nums) % 10) % 10;
    } else {
        # ISBN-10: (digit * 11 - place) % 11
        $checksum = (11 - (sum map { (11 - ++$count) * $_ } @nums) % 11) % 11;
    }

    return $checksum == $check_digit;
}

1;