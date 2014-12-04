package DDG::Spice::Launchbug;

use DDG::Spice;

spice is_cached => 1;


name "Launchbug";
description "Succinct explanation of what this instant answer does";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
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
