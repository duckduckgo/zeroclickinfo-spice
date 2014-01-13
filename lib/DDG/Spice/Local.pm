package DDG::Spice::Local;

use DDG::Spice;

spice to => 'https://127.0.0.1/local.js?q=$1&cb=ddg_spice_local';

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
    'locations',
    'location',
);

handle remainder => sub { return $_ if $_ };

1;

