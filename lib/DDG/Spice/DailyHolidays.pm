package DDG::Spice::DailyHolidays;
# ABSTRACT: Holidays for a specific day.

use DDG::Spice;
use strict;
use warnings;

# TODO: Use 'DDG::GoodieRole::Dates' when it becomes available.
sub parse_date { $_ }

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 0;

spice to => 'http://www.checkiday.com/api/3/?d=$1';

triggers any => 'holidays';

handle remainder => sub {
    my $remainder = $_;
    my $date = $remainder ? parse_date($remainder) : 'today';
    return $date;
};

1;
