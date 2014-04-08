package DDG::Spice::Amazon;

use DDG::Spice;

spice to => 'https://127.0.0.1/m.js?q=$1&cb=ddg_spice_amazon';

triggers start => '///***never trigger***///';

handle remainder => sub {
    return "$_" if $_;
};

1;

