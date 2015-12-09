package DDG::Spice::RustCargo;
# ABSTRACT: Returns package information from the Cargo package manager's registry.

use strict;
use DDG::Spice;

primary_example_queries "cargo package gcc", "rust cargo time";
description "Shows a Cargo package";
name "Rust Cargo";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Cargo.pm";
icon_url "/i/crates.io.ico";
topics "sysadmin", "programming";
category "programming";
attribution github  => ['https://github.com/tombebbington', 'Tom Bebbington'],
            twitter => ['https://twitter.com/tomdbebbington', '@Tom Bebbington'];

triggers startend => 'cargo package', 'cargo packages', 'rust package', 'rust packages', 'rust cargo';

spice to => 'https://crates.io/api/v1/crates/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return lc $_ if $_;
    return;
};

1;
