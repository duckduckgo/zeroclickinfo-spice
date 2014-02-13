package DDG::Spice::9wsearch;

use DDG::Spice;

name '9WSearch';
description '9W Search right answer to a financial question';
primary_example_queries 'msft', 'goog';
source '9WSearch';
category 'finance';
topics 'economy_and_finance';
icon_url 'http://www.9wsearch.com/media/images/9wLogo.png';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/9wsearch.pm';
attribution github => ['https://github.com/aparna-hexagon', 'Aparna'];

spice to => 'http://www.9wsearch.com/widget/description.php?arg=$1';
spice wrap_jsonp_callback => 1;

my @triggers = share('triggers.txt')->slurp;

triggers any => @triggers;

handle query_lc => sub {
  return $_ if $_;
};
1;
