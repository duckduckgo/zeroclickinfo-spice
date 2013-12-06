package DDG::Spice::Plos;

use DDG::Spice;

name 'PLOS Search';
description 'Search research articles of PLOS journals';
primary_example_queries 'plos dinosaurs', 'plos echinoderm evolution';
secondary_example_queries 'plos dinosaurs title:metabolism';
source 'PLOS';
category 'special';
topics 'science';
icon_url 'http://www.plosone.org/images/favicon.ico';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Plos.pm';
attribution twitter => 'nelas',
			github => ['nelas', 'Bruno C. Vellutini'],
			web => ['http://organelas.com/', 'organelas.com'];

triggers startend => 'plos';

spice to => 'http://api.plos.org/search?q=$1&rows=10&wt=json'
            . '&fl=id,title_display,author_display,journal,volume,issue,publication_date'
            . '&api_key={{ENV{DDG_SPICE_PLOS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
