package DDG::Spice::Launchbug;

use DDG::Spice;

spice is_cached => 1;


name "Launchbug";
description "Returns infos about a given bug-id on Launchpad.net";
primary_example_queries "launchbug 7", "launchbug 2983";
category "programming";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Launchbug.pm";
attribution github => ["https://github.com/puskin94/", "puskin"];


triggers startend => "launchbug";
spice to => 'https://api.launchpad.net/devel/bugs/$1?ws.accept=application%2Fjson';
spice wrap_jsonp_callback => 1;


handle remainder => sub {

    my $num = shift;
    return unless $num;
    return unless $num =~ qr/^\d+$/;
    return $num;
    return $_;

};

1;
