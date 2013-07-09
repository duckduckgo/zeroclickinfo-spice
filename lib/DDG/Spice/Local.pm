package DDG::Spice::Local;

use DDG::Spice;

spice to => 'http://dylan.duckduckgo.com/yelp.js?q=$1';

triggers any => (
    'nearest',
    'closest',
    'local',
);

handle remainder => sub { $_ };

1;

