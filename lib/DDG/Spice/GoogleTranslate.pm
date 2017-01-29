package DDG::Spice::GoogleTranslate;

use DDG::Spice;

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://translate.google.com/translate_a/t?client=t&amp;text=$1&amp;sl=auto&amp;tl=$2';
spice wrap_jsonp_callback => 1;

attribution web => ['http://niute.ch','niu tech'];

triggers any => 'in', 'to';

handle remainder => sub {
	my (%langs) = (
		'Arabic' => 'ar',
		'Bulgarian' =>'bg',
		'Chinese' => 'zh-CN',
		'Croatian' => 'hr',
		'Czech' => 'cs',
		'Danish' => 'da',
		'Dutch' => 'nl',
		'English' => 'en',
		'Finnish' => 'fi',
		'French' => 'fr',
		'German' => 'de',
		'Greek' => 'el',
		'Hindi' => 'hi',
		'Italian' => 'it',
		'Japanese' => 'ja',
		'Korean' => 'ko',
		'Norwegian' => 'no',
		'Polish' => 'pl',
		'Portuguese' => 'pt',
		'Romanian' => 'ro',
		'Russian' => 'ru',
		'Spanish' => 'es',
		'Swedish' => 'sv'
	);
	my ($countries) = join('|', keys(%langs));
	if($_ =~ /^(\w+)\s*($countries)$/) {
		return $1, $langs{$2}; 
	}
    return;
};

1;
