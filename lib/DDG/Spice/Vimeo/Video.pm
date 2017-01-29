package DDG::Spice::Vimeo::Video;
# ABSTRACT: Embeds videos from vimeo

use DDG::Spice;

spice to => 'http://vimeo.com/api/oembed.json?url=$1&callback={{callback}}';

triggers query_lc => qr/^https?:\/\/vimeo.com\/[0-9]+|^vimeo.com\/[0-9]+/;

attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

handle matches => sub {
    if (/^vimeo.com\/[0-9]+/){
        return 'http://' . $_ if defined $_;
    }
    return $_ if defined $_; 
    return;
};

1;
