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
    if (/\s+in\s+(.*)$/p) {
        ($q, $c) = (${^PREMATCH}, $1);
    } else {
        ($q, $c) = ($_, $loc->country_name);
    }
    $q =~ s/\///g;
    $c =~ s/\///g;

    return $c, $q;
};


1;
