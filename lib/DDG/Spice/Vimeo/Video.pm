package DDG::Spice::Vimeo::Video;
# ABSTRACT: Embeds videos from vimeo

use DDG::Spice;

spice to => 'http://vimeo.com/api/oembed.json?url=$1&maxwidth=600&callback={{callback}}';

triggers query_lc => qr/^https?:\/\/vimeo.com\/[0-9]+/;

handle matches => sub {
    return $_ if defined $_; 
    return;
};

1;
