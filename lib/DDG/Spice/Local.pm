package DDG::Spice::Local;

use DDG::Spice;

spice to => 'https://dylan.duckduckgo.com/local.js?q=$1&cb=ddg_spice_local';

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

