package DDG::Spice::Trends;
# ABSTRACT: Give Twitter's trending topics for the specificed location.

use DDG::Spice;

attribution web => ['http://kevinschaul.com','Kevin Schaul'],
            email => ['kevin.schaul@gmail.com','Kevin Schaul'];

spice to => 'http://query.yahooapis.com/v1/public/yql?q=select%20woeid%20from%20geo.places%20where%20text%3D\'$1\'&format=json&callback={{callback}}';

triggers query_lc => qr/^(?:twitter\s+)?(?:trending|trends|trend)\s*(?:twitter)?\s*(?:topics|topic)?\s*(?:twitter)?\s*(?:in)?\s*(.*)?/;

handle matches => sub {
    my ($uname) = @_;
    return $uname if $uname;
    return 'world';
    # `world` will return woeid `1`, which is used for Twitter's gloabl
    # trending topics search.
};

1;

