package DDG::Spice::Aur;

use DDG::Spice;

attribution twitter => 'crazedpsyc',
            cpan => 'CRZEDPSYC';

spice to => 'http://aur.archlinux.org/rpc.php?type=search&arg=$1&callback={{callback}}';

triggers any => "aur", "archlinux package", "arch package";

handle remainder => sub {
    s/^for //;
    return $_;
};

1;

