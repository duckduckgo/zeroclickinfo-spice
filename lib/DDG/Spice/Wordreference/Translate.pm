package DDG::Spice::Wordreference::Translate;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_WORDREFERENCE_APIKEY}}}/json/$1/$2?callback={{callback}}';
spice from => '([a-z]+)\/([a-z]+)';

triggers query_lc => qr/^translate ([a-z]+) from ($dicts) to ($dicts)$/;

handle matches => sub {
	my ($word, $from, $to) = @_;

	$from = shorten_lang($from);
	$to   = shorten_lang($to);

	my $dict = $from.$to;

	return ($dict, $word)
};

sub shorten_lang {
	my ($lang) = @_;

	my $langs = {
		'arabic'     => 'ar',
		'chinese'    => 'zh',
		'czech'      => 'cz',
		'english'    => 'en',
		'french'     => 'fr',
		'greek'      => 'gr',
		'italian'    => 'it',
		'japanese'   => 'ja',
		'korean'     => 'ko',
		'polish'     => 'pl',
		'portuguese' => 'pt',
		'romanian'   => 'ro',
		'spanish'    => 'es',
		'turkish'    => 'tr'
	};

	return $langs -> {$lang} ? $langs -> {$lang} : $lang;
}

1;
