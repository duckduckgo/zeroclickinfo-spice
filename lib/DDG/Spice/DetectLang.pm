package DDG::Spice::DetectLang;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice wrap_jsonp_callback => 1;

triggers startend => 'detect language', 'identify language', 'what language',
		     'determine language', 'check language';

handle remainder => sub {
	my ($str) = @_;

	return $str if $str;
	return
};

1;
