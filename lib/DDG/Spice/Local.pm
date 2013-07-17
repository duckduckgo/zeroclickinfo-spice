package DDG::Spice::Local;

use DDG::Spice;

spice to => 'http://dylan.duckduckgo.com/local.js?q=$1';

triggers any => (
    'near',
    'local',
    'near me',
    'around',
    'here',
    'locally',
    'nearby',
    'close',
    'closest',
    'nearest',
);

handle remainder => sub { $_ };

1;

