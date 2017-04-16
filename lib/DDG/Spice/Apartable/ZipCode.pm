package DDG::Spice::Apartable::ZipCode;

use DDG::Spice;

primary_example_queries "apartments {zipcode}";
description "Search apartaments by zipcode";
name "Apartable::ZipCode";
icon_url "/i/apartable.com.ico";
source "Apartable::ZipCode";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Apartable/ZipCode.pm";
category "random";
attribution github => ['https://github.com/romanyerin','Roman Yerin'];

spice to => 'http://apartable.com/search.json?zipcode=$1';
spice wrap_jsonp_callback => 1;

triggers start => "apartments";

handle remainder => sub {
    return unless $_=~/(\d{5})/i;
    return $1;
};

1;
