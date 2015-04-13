package DDG::Spice::Climbing;
# ABSTRACT: Show a summary of the searched CPAN module.

use strict;
use DDG::Spice;

primary_example_queries "metacpan WWW::DuckDuckGo";
description "Searches CPAN modules";
name "MetaCPAN";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MetaCPAN.pm";
icon_url "/i/metacpan.org.ico";
topics "programming", "sysadmin";
category "programming";
attribution github  => ['https://github.com/ghedo', 'Alessandro Ghedini'],
            web => ['http://ghedini.me', 'Alessandro Ghedini'],
            github  => ['https://github.com/dsteinbrunner', 'David Steinbrunner'];

spice to   => 'http://jason.duckduckgo.com:8000/solr/select?indent=on&version=2.2&defType=edismax&qt=dismax&q=$1&source_match:climb&fq=&start=0&rows=10&wt=json';
spice wrap_jsonp_callback => 1;

triggers startend => "climb", "climbing";

handle remainder => sub {
    if ($_) {
        return $_;
    }
    return;
};
1;
