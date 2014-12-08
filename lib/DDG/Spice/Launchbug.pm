package DDG::Spice::Launchbug;

use DDG::Spice;

spice is_cached => 1;


name "Launchbug";
description "Returns infos about a given bug-id on Launchpad.net";
primary_example_queries "LP: 7", "LP: #2983", "(LP: #1234)";
category "programming";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Launchbug.pm";
attribution github => ["https://github.com/puskin94/", "puskin"];

triggers query_raw => qr/^\(?LP\: \#?(\d+)\)?/;
spice to => 'https://api.launchpad.net/devel/bugs/$1?ws.accept=application%2Fjson';
spice wrap_jsonp_callback => 1;


handle query_raw => sub {

    my $num = $1;
    return unless $num && $num =~ qr/^\d+$/;
    return $num;

};

1;
