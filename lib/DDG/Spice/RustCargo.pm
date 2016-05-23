package DDG::Spice::RustCargo;
# ABSTRACT: Returns package information from the Cargo package manager's registry.

use strict;
use DDG::Spice;

triggers startend => [
    'cargo package', 
    'cargo packages', 
    'rust package', 
    'rust packages', 
    'rust cargo', 
    'rust crate'
];

spice to => 'https://crates.io/api/v1/crates?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return lc $_ if $_;
    return;
};

1;
