package DDG::Spice::Uzzinivin;

# ABSTRACT: Get car VIN from registration number in Latvia 

use DDG::Spice;
use strict;
use warnings;

spice wrap_jsonp_callback => 1;

spice to => 'https://uzzinivin.lv/duckduckgo.php/?rn=$1';
triggers any => 'uzzinivin';
triggers startend => 'get vin', 'reģistrācijas numurs', 'registracijas numurs', 'check vin', 'vin pārbaude', 'vin parbaude', 'get rn';

# Handle statement
handle remainder => sub {
    return $_ if $_;
    return;
};

1;
