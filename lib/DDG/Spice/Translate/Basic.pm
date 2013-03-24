package DDG::Spice::Translate::Basic;

use DDG::Spice;

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $dicts = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_WORDREFERENCE_APIKEY}}}/json/$1/$2';
spice from => '(.+)\/(.+)';
spice wrap_jsonp_callback => 1;
#spice wrap_string_callback => 1;

triggers start => "translate";

handle query_lc => sub {
    my $query = $_;

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
    };
    
    if($query =~ /^translate (.+) from ($dicts) to ($dicts)$/) {
        my ($words, $from, $to) = ($1, $2, $3);

        $from = shorten_lang($from);
        $to   = shorten_lang($to);

        my $dict = $from.$to;

        return ($dict, $words);
    }

    return;
};

1;
