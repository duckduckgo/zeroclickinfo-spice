package DDG::Spice::MetaCPAN;
# ABSTRACT: Show a summary of the searched CPAN module.

use DDG::Spice;

attribution github  => ['https://github.com/AlexBio', 'AlexBio'  ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://api.metacpan.org/v0/module/$1?callback={{callback}}';

triggers startend => "cpan", "metacpan", "meta cpan";

handle remainder => sub { return shift };

1;
