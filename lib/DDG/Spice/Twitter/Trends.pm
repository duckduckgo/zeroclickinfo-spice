package DDG::Spice::Twitter::Trends;
# ABSTRACT: Give Twitter's trending topics for the specificed location.

use DDG::Spice;

attribution web => ['http://kevinschaul.com','Kevin Schaul'],
            email => ['kevin.schaul@gmail.com','Kevin Schaul'];

triggers start => "///***never_trigger***///";

spice to => 'http://api.twitter.com/1/trends/$1.json?callback={{callback}}';

handle remainder => sub {
    return;
};

1;