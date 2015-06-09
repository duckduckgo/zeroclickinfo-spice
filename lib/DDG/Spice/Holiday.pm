package DDG::Spice::Holiday;
# ABSTRACT: Query timeanddate.com for a holiday

use DDG::Spice;
use POSIX qw(strftime);

name "Time and Date holiday search";
source "timeanddate.com";
icon_url "/i/www.timeanddate.com.ico";
description "Search for holidays";
primary_example_queries "when is halloween", "when is constitution day in kazakhstan";
category "dates";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Holiday.pm";

attribution github => ['https://github.com/iambibhas', 'Bibhas'],
            twitter => ['https://twitter.com/bibhasdn', 'Bibhas D'];

triggers start => 'when is';

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$1&q=$2&y=$3&callback={{callback}}';

handle remainder => sub {
    return unless ($_);

    my ($q, $c, $y);

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

    if ($q =~ /([\d]{4})/) {
        $y = $1;
        $q =~ s/\ ?[\d]{4}//g;
    } else {
        $y = strftime "%Y", localtime;
    }

    # Kill eventual slashes to avoid misbehaviour of the `spice from'
    # regular expression.
    $q =~ s/\///g;
    $c =~ s/\///g;

    return $c, $q, $y;
};


1;
