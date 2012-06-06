package DDG::Spice::ExpandURL;
# ABSTRACT: Gives expanded url of the query

use DDG::Spice;

spice to => 'http://api.longurl.org/v2/expand?url=$1&format=json&callback={{callback}}';

triggers startend => "expand";

handle remainder => sub {
    return $_;
};

1;
