package DDG::Spice::TimeAndDateHoliday;
# ABSTRACT: Query timeanddate.com for a holiday

use DDG::Spice;

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
