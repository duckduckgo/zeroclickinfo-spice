package DDG::Spice::9wsearch;

use DDG::Spice;


name '9W Search';
description '9W Search right answer to a financial question';
#primary_example_queries 'plos dinosaurs', 'plos echinoderm evolution';
#secondary_example_queries 'plos dinosaurs title:metabolism';
source '9WSearch';
category 'finance';
topics 'economy_and_finance';
icon_url 'http://www.9wsearch.com/media/images/9wLogo.png';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/9wsearch.pm';
attribution twitter => 'Aparna',
			github => ['aparna-hexagon', 'Aparna'];

triggers startend => "information","9wsearch","description","company", "company information", "company description";
spice to => 'http://www.9wsearch.com/widget/description.php?arg=$1';
spice wrap_jsonp_callback => 1;



handle remainder => sub {
    # Only trigger if the remainder does not exist in the skip hash.
    return $_ if $_;
    return;
};

1;
