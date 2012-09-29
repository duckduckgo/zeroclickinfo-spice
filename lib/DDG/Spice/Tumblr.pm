package DDG::Spice::Tumblr;

use DDG::Spice;

spice to => 'http://api.tumblr.com/v2/tagged?tag=$1&feature_type=popular&api_key={{ENV{DDG_SPICE_TUMBLR_APIKEY}}}&callback={{callback}}';

#triggers query_lc => qr/^(?:tumblr\s+)([^\s]+)$/;
#triggers startend => "tumblr";
triggers query_lc => qr/^tumblr\s+(.+)$/;

#handle query_lc => sub {
handle matches => sub {
    return $_[0];
};

'im a little teapot';
