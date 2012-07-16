package DDG::Spice::Upc;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => "upc";

spice to => 'http://www.upcdatabase.org/api/json/1b82dc4da0dffeb1b884661c3029da2e/$1';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
   return unless /^(?:upc(?: (?:code|lookup))?)(\d{12})$/;
   return $1;
};

1;
