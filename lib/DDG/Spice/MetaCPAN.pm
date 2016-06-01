package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use strict;
use DDG::Spice;

spice to   => 'http://api.metacpan.org/v0/module/$1?callback={{callback}}';

triggers startend => "cpan", "cpanm", "metacpan", "meta cpan", "perl library", "perl lib";

handle remainder => sub {
    if ($_) {
        $_ =~ s/-/::/g;
        return $_;
    }
    return;
};
1;
