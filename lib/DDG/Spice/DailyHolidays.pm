package DDG::Spice::DailyHolidays;
# ABSTRACT: Holidays for a specific day.

use DDG::Spice;
use strict;
use warnings;

# TODO: Use 'DDG::GoodieRole::Dates' when it becomes available.
sub parse_date { $_[0] }

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 1;

spice to => 'http://www.checkiday.com/api/3/?d=$1';

my %no_remainder_forms = map { $_ => 1 } (
    'daily holidays',
    'daily holiday',
);

my @other_forms = (
    'holiday',
    'holidays',
    'what day is',
    q{what's happening},
);

triggers any => (keys %no_remainder_forms, @other_forms);

my $stop_re = qr/(what|is|'s|\p{punct}|on|for|public|national)/i;

sub check_no_remainder_form {
    my ($trigger) = @_;
    return $no_remainder_forms{lc $trigger};
}

handle remainder => sub {
    my $remainder = $_;
    $remainder =~ s/$stop_re//g;
    $remainder =~ s/\s+$//go;
    $remainder =~ s/\s{2,}/ /go;
    $remainder =~ s/^\s+//go;
    check_no_remainder_form($req->matched_trigger) or return unless $remainder;
    my $date = $remainder ? parse_date($remainder) : 'today';
    return $date;
};

1;
