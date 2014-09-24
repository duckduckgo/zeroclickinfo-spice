package DDG::Spice::TimeAndDateHoliday;
# ABSTRACT: Query timeanddate.com for a holiday

use DDG::Spice;

name "Time and Date holiday search";
source "timeanddate.com";
icon_url "/i/www.timeanddate.com.ico";
description "Search for holidays";
primary_example_queries "when is halloween", "when is constitution day in kazakhstan";
category "dates";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TimeAndDateHoliday.pm";
attribution email => 'webmaster@timeanddate.com',
            web => ['http://www.timeanddate.com', 'timeanddate.com'];

triggers start => 'when is';

spice from => '([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$1&q=$2&callback={{callback}}';

handle remainder => sub {
    return unless ($_);

    my ($q, $c);

    # Did the user query for holidays in a specific country?
    if (/\s+in\s+(.*)$/p) {
        ($q, $c) = (${^PREMATCH}, $1);

    # No - check the country the user is currently in.
    } elsif ($loc && $loc->country_name) {
        ($q, $c) = ($_, $loc->country_name);

    # Fallback to US if no country can be determined, that's the
    # country that has best holiday coverage.
    } else {
        ($q, $c) = ($_, 'us');
    }

    # Kill eventual slashes to avoid misbehaviour of the `spice from'
    # regular expression.
    $q =~ s/\///g;
    $c =~ s/\///g;

    return $c, $q;
};


1;
