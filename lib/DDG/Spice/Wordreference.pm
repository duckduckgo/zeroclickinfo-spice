package DDG::Spice::Wordreference;

use v5.10;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';
my $share = 'share/spice/wordreference';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_TRANSLATE_APIKEY}}}/json/$1/$2?callback={{callback}}';
spice from => '([a-z]+)\/([a-z]+)';

triggers query_lc => qr/^translate ([a-z]+)(?: from ($dicts))? to ($dicts)$/;

handle matches => sub {
	my ($word, $from, $to) = @_;

	$from = $from ? shorten_lang($from) : which_lang($word);
	$to   = shorten_lang($to);

	my $dict = $from.$to;

	return ($dict, $word)
};

sub shorten_lang {
	my ($lang) = @_;

	given ($lang) {
		when ('arabic')     { return 'ar'  }
		when ('chinese')    { return 'zh'  }
		when ('czech')      { return 'cz'  }
		when ('english')    { return 'en'  }
		when ('french')     { return 'fr'  }
		when ('greek')      { return 'gr'  }
		when ('italian')    { return 'it'  }
		when ('japanese')   { return 'ja'  }
		when ('korean')     { return 'ko'  }
		when ('polish')     { return 'pl'  }
		when ('portuguese') { return 'pt'  }
		when ('romanian')   { return 'ro'  }
		when ('spanish')    { return 'es'  }
		when ('turkish')    { return 'tr'  }
		default             { return $lang }
	}
}

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
