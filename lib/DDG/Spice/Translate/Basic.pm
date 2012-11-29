package DDG::Spice::Translate::Basic;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://example.com';
spice from => '(.+)\/(.+)';
spice wrap_string_callback => 1;

triggers query_lc => qr/^translate (.+) from ($dicts) to ($dicts)$/;

handle matches => sub {
	my ($words, $from, $to) = @_;

	$from = shorten_lang($from);
	$to   = shorten_lang($to);

	my $dict = $from.$to;

	return ($dict, $words)
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
