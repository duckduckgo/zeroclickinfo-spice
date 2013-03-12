package DDG::Spice::Hackage::PackageDetails;
# ABSTRACT: Search for information about Hackage packages

use DDG::Spice;

triggers start => "///***never_trigger***///";
spice to => 'http://typeful.net/~tbot/hackage/packages/$1/$1.json';

primary_example_queries "hackage containers";
description "Haskell packages";
name "Hackage";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hackage/PackageDetails.pm";
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
