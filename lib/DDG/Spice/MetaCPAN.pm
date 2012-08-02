package DDG::Spice::MetaCPAN;

use DDG::Spice;

attribution github  => ['https://github.com/AlexBio', 'AlexBio'  ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://api.metacpan.org/v0/module/$1?callback={{callback}}';

triggers query => qr/^cpan ([A-Za-z0-9\:]+)$/;

handle matches => sub { return shift };

1;
