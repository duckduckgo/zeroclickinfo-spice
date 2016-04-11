package DDG::Spice::Aur;
# ABSTRACT: Archlinux user repository package look-up

use strict;
use DDG::Spice;
spice is_cached => 1;

spice to => 'https://aur.archlinux.org/rpc.php?type=search&arg=$1';
spice wrap_jsonp_callback => 1;

triggers any => "aur", "archlinux package", "arch package", "arch linux package";

handle remainder => sub {
    my $remainder = $_;
    $remainder =~ s/^for\s//;
    return unless $remainder;
};
1;
