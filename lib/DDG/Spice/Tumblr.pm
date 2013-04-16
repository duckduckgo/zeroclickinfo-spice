package DDG::Spice::Tumblr;

use DDG::Spice;

spice to => 'http://api.tumblr.com/v2/tagged?tag=$1&feature_type=popular&api_key={{ENV{DDG_SPICE_TUMBLR_APIKEY}}}&callback={{callback}}';

primary_example_queries "tumblr flowers";
description "Tumblr pictures";
name "Tumblr";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tumblr.pm";
topics "everyday", "social";
category "entertainment";
attribution github => ['https://github.com/nilnilnil','Caine Tighe'],
            twitter => ['http://twitter.com/__nil','caine tighe'];
status "disabled";

#triggers query_lc => qr/^(?:tumblr\s+)(\S+)$/;
#triggers startend => "tumblr";
triggers query_lc => qr/^tumblr\s+(.+)$/;

#handle query_lc => sub {
handle matches => sub {
    return $_[0];
};

'im a little teapot';
