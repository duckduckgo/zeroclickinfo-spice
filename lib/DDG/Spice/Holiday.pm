package DDG::Spice::Holiday;

# ABSTRACT: Query timeanddate.com for a holiday

use DDG::Spice;
use POSIX qw(strftime);

triggers start => 'when is', 'when was', 'what day is', 'what day was';

spice from => '([^/]+)/([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$2&q=$3&y=$4&callback={{callback}}';

handle query_lc => sub {
    return unless ($_);

    my ($t, $q, $c, $y);

    if ($_ =~ /\ ?(?:when|what day)\ ?(is|was)/g) {
        $t = $1;
        $_ =~ s/\ ?(when|what day)\ ?(is|was)\ ?//g;
    }

    if (/\s+in\s+(.*)$/p) {
        # Did the user query for holidays in a specific country?
        ($q, $c) = (${^PREMATCH}, $1);

        # For cases like "in the usa"
        $c =~ s/\ ?\bthe\b\ ?//g;
        $c =~ s/\b(us|usa|america|murica)\b/United States/g;
    } elsif ($loc && $loc->country_name) {
        # No - check the country the user is currently in.
        ($q, $c) = ($_, $loc->country_name);
    } else {
        # Fallback to US if no country can be determined, that's the
        # country that has best holiday coverage.
        ($q, $c) = ($_, 'us');
    }

    # Block queries like "a day"
    return if $q =~ /^[a-z1-9]?\ ?day$/;

    if ($q =~ /([\d]{4})/) {
        $y = $1;
    } else {
        $y = " ";
    }

    $q =~ s/\ *\d+\ *//g;

    # Kill eventual slashes to avoid misbehaviour of the `spice from'
    # regular expression.
    $q =~ s/\///g;
    $c =~ s/\///g;

    # Translate holidays that timeanddate.com doesn't understand.
    my %fixups = (
        "mardi gras" => "shrove tuesday",
        "new years" => "new years day",
    );

    map { $q =~ s/$_/$fixups{$_}/ } keys %fixups;

    return $t, $c, $q, $y;
};

1;
