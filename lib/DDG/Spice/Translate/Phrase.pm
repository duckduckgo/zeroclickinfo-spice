package DDG::Spice::Translate::Phrase;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://mymemory.translated.net/api/get?q=$3&langpair=$1|$2&de=office@duckduckgo.com';
spice from => '(.+)\/(.+)\/(.+)';
spice wrap_jsonp_callback => 1;

triggers start => '///***never trigger***///';

handle remainder => sub { return };

1;