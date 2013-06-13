package DDG::Spice::DetectLang;

use utf8;
use DDG::Spice;

primary_example_queries "detect language こんにちは";
secondary_example_queries "what language is como estas";
description "Detects the language";
name "Detect Language";
icon_url "/i/detectlanguage.com.ico";
source "Detect Language";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DetectLang.pm";
topics "everyday", "words_and_games";
category "language";
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
