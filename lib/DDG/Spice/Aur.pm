package DDG::Spice::Aur;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Aur";
source "aur.archlinux.org";
icon_url "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1000px-Archlinux-icon-crystal-64.svg.png";
description "Provides hook into Arch User Repository API";
primary_example_queries "aur mopidy", "aur python2-twisted";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "software";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aur.pm";
attribution github => ["NateBrune", "Nate Brune"];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://aur.archlinux.org/rpc.php?type=search&arg=$1&callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => "Aur", "aur", "AUR";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
