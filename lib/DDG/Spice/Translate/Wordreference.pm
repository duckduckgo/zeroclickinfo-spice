package DDG::Spice::Translate::Wordreference;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_WORDREFERENCE_APIKEY}}}/json/$1/$2?callback={{callback}}';
spice from => '(.+)\/(.+)';

triggers start => '///***never trigger***///';

handle remainder => sub { return };

1;
