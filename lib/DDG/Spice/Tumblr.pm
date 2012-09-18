package DDG::Spice::Tumblr;

use DDG::Spice;

spice to => 'http://api.tumblr.com/v2/tagged?tag=$1&feature_type=popular&api_key=HIpY8au5Gf4RU9uI1fHq81t4tCZZueG66smdPyoWnD9s3gkMZc&callback={{callback}}';

#triggers query_lc => qr/^(?:tumblr\s+)([^\s]+)$/;
#triggers startend => "tumblr";
triggers query_lc => qr/^tumblr\s+(.+)$/;

#handle query_lc => sub {
handle matches => sub {
    return $_[0];
};

'im a little teapot';
