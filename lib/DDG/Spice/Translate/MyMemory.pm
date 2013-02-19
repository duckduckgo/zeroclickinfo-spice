package DDG::Spice::Translate::MyMemory;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://mymemory.translated.net/api/get?q=$3&langpair=$1|$2';
spice from => '(.+)\/(.+)\/(.+)';
spice wrap_jsonp_callback => 1;

triggers start => '///***never trigger***///';

handle remainder => sub { return };

1;
