package DDG::Spice::IsGDExpander;
# ABSTRACT: Return an expanded version of a is.gd shortened URL.

use DDG::Spice;

primary_example_queries "http://is.gd/rgHZPL";
secondary_example_queries "is.gd/MBzJbp";
description "Expand URLs using the is.gd API";
name "IsGDExpander";
icon_url "/i/is.gd.ico";
source "IsGDExpander";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IsGDExpander.pm";
topics "social";
category "computing_tools";
attribution github => ['https://github.com/ehsan','ehsan'];

spice from => '([^/]+)/(.*)';
spice to => 'http://is.gd/forward.php?format=json&shorturl=$1%3A%2F%2F$2&callback={{callback}}';
triggers query_raw => qr|is\.gd/|;

handle query_raw => sub {
    m|(https?)?(?:://)?(is.gd/[a-zA-Z0-9]+)| =~ shift;
    return (defined $1 ? $1 : 'http'), $2 if defined $2;
    return;
};

1;
