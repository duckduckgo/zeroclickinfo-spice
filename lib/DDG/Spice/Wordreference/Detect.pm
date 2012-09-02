package DDG::Spice::Wordreference::Detect;

use v5.10;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice from => '([a-z]+)\/([a-z]+)';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/^translate ([a-z]+) to ($dicts)$/;

handle matches => sub {
	my ($word, $to) = @_;

	return ($word, shorten_lang($to))
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
