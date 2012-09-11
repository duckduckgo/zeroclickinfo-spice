package DDG::Spice::Wordreference::Translate;

use v5.10;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_TRANSLATE_APIKEY}}}/json/$1/$2?callback={{callback}}';
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

1;
