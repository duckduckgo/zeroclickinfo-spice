package DDG::Spice::Octopart;

use strict;
use DDG::Spice;

primary_example_queries "atmega datasheet";
secondary_example_queries "ne555 specs";
description "Searches parts from Octopart.";
name "Octopart";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Octopart.pm";
icon_url "/i/octopart.com.ico";
topics "special_interest", "geek";
category "special";
attribution github  => ['https://github.com/bnewbold', 'bnewbold'];

triggers any => "datasheet", "specs", "octopart";

spice to => 'http://octopart.com/api/v3/parts/search?apikey={{ENV{DDG_SPICE_OCTOPART_APIKEY}}}&limit=12&q=$1&include[]=datasheets&include[]=avg_price_v2&include[]=market_status_v2&include[]=imagesets&include[]=short_description&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
