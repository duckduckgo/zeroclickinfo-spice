package DDG::Spice::Hackage::PackageDetails;
# ABSTRACT: Search for information about Hackage packages

use DDG::Spice;

attribution github => ["https://github.com/nomeata", "Joachim Breitner"],
            web => ["http://www.joachim-breitner.de", "Joachim Breitner"],
            email => ['mail@joachim-breitner.de', "Joachim Breitner"];

spice to => 'http://typeful.net/~tbot/hackage/packages/$1/$1.json';

1;
