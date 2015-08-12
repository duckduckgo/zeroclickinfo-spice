package DDG::Spice::Aur;
# ABSTRACT: Archlinux user repository package look-up

use strict;
use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Aur";
source "aur.archlinux.org";
icon_url "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1000px-Archlinux-icon-crystal-64.svg.png";
description "Provides hook into Arch User Repository API";
primary_example_queries "aur mopidy", "aur python2";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "software";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aur.pm";
attribution twitter => 'crazedpsyc',
                 cpan => 'CRZEDPSYC',
                 github => ['NateBrune', 'Nate Brune'];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://aur.archlinux.org/rpc.php?type=search&arg=$1&callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => "aur", "archlinux package", "arch package", "arch linux package";

# Handle statement
handle remainder => sub {
    my $remainder = $_;
    $remainder =~ s/^for\s//;
    return unless $remainder;
};

1;
