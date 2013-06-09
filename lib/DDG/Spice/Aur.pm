package DDG::Spice::Aur;

use DDG::Spice;

primary_example_queries "arch package 9base";
secondary_example_queries "archlinux package epiphany";
description "Lookup packages from the Archlinux user repository";
name "AUR";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aur.pm";
topics "programming";
category "programming";
attribution twitter => ['https://twitter.com/crazedpsyc', 'crazedpsyc'],
            cpan => 'CRZEDPSYC';

spice to => 'https://aur.archlinux.org/rpc.php?type=search&arg=$1&callback={{callback}}';

triggers any => "aur", "archlinux package", "arch package", "arch linux package";

handle remainder => sub {
    s/^for //;
    return $_;
};

1;

