package DDG::Spice::ExpandURL;
# ABSTRACT: Gives expanded url of the query

use DDG::Spice;

spice to => 'http://api.longurl.org/v2/expand?url=$1&format=json&callback={{callback}}';

triggers query => qr/^((?:expand\s(.*))|(https?:\/\/(bit\.ly|j\.mp|awe.sm|t\.co|g\.co|is\.gd|ow\.ly)\/.*))/;

handle matches => sub {
    return $2 if $2;
    return $1;
    return;
};

1;
