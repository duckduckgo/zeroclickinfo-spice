package DDG::Spice::Hackage::Packages;
# ABSTRACT: Search for information about Hackage packages

use DDG::Spice;

triggers any => "hackage", "haskell";
spice to => 'http://typeful.net/~tbot/hackage/latest-package-versions.json';

primary_example_queries "hackage containers";
description "Haskell packages";
name "Hackage";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hackage/Packages.pm";
topics "programming";
category "programming";
attribution github => ["https://github.com/nomeata", "Joachim Breitner"],
            web => ["http://www.joachim-breitner.de", "Joachim Breitner"],
            email => ['mail@joachim-breitner.de', "Joachim Breitner"];
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;   
};

1;
