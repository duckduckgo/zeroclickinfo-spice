package DDG::Spice::Octopart;

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
status "enabled";
triggers any => "datasheet", "specs", "octopart";

spice to => 'http://octopart.com/api/v2/parts/search?apikey={{ENV{DDG_SPICE_OCTOPART_APIKEY}}}&limit=5&optimize.hide_offers=1&optimize.hide_specs=1&q=$1&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
