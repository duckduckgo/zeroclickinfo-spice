package DDG::Spice::Wordreference;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'ar|zh|cz|en|fr|gr|it|ja|ko|pl|pt|ro|es|tr';
my $share = 'share/spice/wordreference';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_TRANSLATE_APIKEY}}}/json/$1/$2?callback={{callback}}';
spice from => '([a-z]+)\/([a-z]+)';

triggers query_lc => qr/^translate ([a-z]+)(?: from ($dicts))? to ($dicts)$/;

handle matches => sub {
	my ($word, $from, $to) = @_;

	$from = $from ? $from : which_lang($word);

	my $dict = $from.$to;

	return ($dict, $word)
};

sub which_lang {
	my ($word) = @_;

	return 'en' if is_lang($word, 'english');
	return 'it' if is_lang($word, 'italian');
	return 'fr' if is_lang($word, 'french' );
}

sub is_lang {
	my ($word, $lang) = @_;

	my $out = 0;

	open my $list, '<', $share.'/words/'.$lang;
	$out = 1 if grep { chomp $_; /^$word$/ } <$list>;
	close $list;

	return $out;
}

1;
