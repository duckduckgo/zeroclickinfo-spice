package DDG::Spice::Vimeo::Video;
# ABSTRACT: Embeds videos from vimeo

use DDG::Spice;

spice to => 'http://vimeo.com/api/oembed.json?url=$1&maxwidth=300&maxheight=300&callback={{callback}}';

triggers query_lc => qr/^vimeo\s(.*)|^https?:\/\/vimeo.com\/[0-9]+/;

handle matches => sub {
    if (/^http:\/\/vimeo.com\/[0-9]+/) {
        return $_;
    } elsif ($1) {
        return $1;
    }    
    return;
};

1;
