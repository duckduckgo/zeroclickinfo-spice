package DDG::Spice::Doi;

use DDG::Spice;

name "doi";
description "Look up a digital object identifier";
source "doi";
primary_example_queries "10.5524/100005";
category "reference";
topics "science";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Doi.pm";
attribution github => ["https://github.com/nomeata", "Joachim Breitner"],
            web => ["http://www.joachim-breitner.de", "Joachim Breitner"],
            email => ['mail@joachim-breitner.de', "Joachim Breitner"];
status "enabled";

# Regex from http://stackoverflow.com/a/10324802/946226
triggers query_lc => qr%\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\S)+)\b%;

# This would work better, but needs content negotiation
#spice to => 'http://dx.doi.org/$1';
spice to => 'http://data.datacite.org/application/vnd.citationstyles.csl+json/$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 1;

handle matches => sub {
    my ($uname) = @_;
    return $uname if $uname;
    return;
};


1;
