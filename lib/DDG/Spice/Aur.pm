package DDG::Spice::Aur;
# ABSTRACT: Archlinux user repository package look-up

use strict;
use DDG::Spice;
spice is_cached => 1;

name "Aur";
source "aur.archlinux.org";
icon_url "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1000px-Archlinux-icon-crystal-64.svg.png";
description "Provides hook into Arch User Repository API";
primary_example_queries "aur mopidy", "aur python2";
category "software";
topics "computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aur.pm";
attribution twitter => 'crazedpsyc',
                 cpan => 'CRZEDPSYC',
                 github => ['NateBrune', 'Nate Brune'];

spice to => 'https://aur.archlinux.org/rpc.php?type=search&arg=$1';
spice wrap_jsonp_callback => 1;

triggers any => "aur", "archlinux package", "arch package", "arch linux package";

handle remainder => sub {
    my $remainder = $_;
    $remainder =~ s/^for\s//;
    return unless $remainder;
};
1;