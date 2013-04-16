package DDG::Spice::Twitter::Hashtag;

use DDG::Spice;

spice to => 'http://twitter.com/search.json?q=%23$1&callback={{callback}}';

triggers query_lc => qr/^(?:#|hashtag\s+)(\S+)$/;

handle matches => sub {
    my ( $tag ) = @_;
    warn qq(TAG: $tag\n);
    return $tag;
};

'im a little teapot';
