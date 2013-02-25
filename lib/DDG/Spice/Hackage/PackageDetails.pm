package DDG::Spice::Hackage::PackageDetails;
# ABSTRACT: Search for information about Hackage packages

use DDG::Spice;

triggers start => "///***never_trigger***///";
spice to => 'http://www.typeful.net/~tbot/hackage/packages/$1/$1.jsonp';

primary_example_queries "hackage containers";
description "Haskell packages";
name "Hackage";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hackage.pm";
topics "programming";
category "programming";
attribution github => ["https://github.com/nomeata", "Joachim Breitner"],
            web => ["http://www.joachim-breitner.de", "Joachim Breitner"],
            email => ['mail@joachim-breitner.de', "Joachim Breitner"];

handle remainder => sub {
    return;   
};

1;
